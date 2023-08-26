import { useSnackbar } from "notistack";
import {
  CreateEmailInput,
  DeleteEmailInput,
  EmailEdge,
  SetPrimaryEmailInput,
  useCreateEmailMutation,
  useDeleteEmailMutation,
  useSetPrimaryEmailMutation,
  useViewerEmailsQuery,
} from "../../../generated/types";
import Layout from "../../../layout";
import ErrorPage from "../../ErrorPage";
import LoadingPage from "../../LoadingPage";
import AddEmailPaper from "./AddEmailPaper";
import EmailsPaper from "./EmailsPaper";
import SetPrimaryEmailPaper from "./SetPrimaryEmailPaper";

function Emails() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: qData, loading, error } = useViewerEmailsQuery();
  const [createEmailMutation] = useCreateEmailMutation();
  const [setPrimaryEmailMutation] = useSetPrimaryEmailMutation();
  const [deleteEmailMutation] = useDeleteEmailMutation();

  const emails = qData?.viewer.emails;
  const unconfirmedEmails = qData?.viewer.unconfirmedEmails;

  const onCreate = (input: CreateEmailInput) => {
    createEmailMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("激活邮件已发送，请注意查收", { variant: "success" });
      },
      update(cache, { data }) {
        const email = data?.payload?.email;
        if (!email || !qData?.viewer) return;

        cache.modify({
          id: cache.identify(qData.viewer),
          fields: {
            unconfirmedEmails(existingRefs = {}, { toReference, readField }) {
              if (
                existingRefs.edges?.some(
                  (edge: EmailEdge) => readField("id", edge.node) === email.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "EmailEdge",
                    node: toReference(email),
                  },
                ],
              };
            },
          },
        });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  const onSetPrimary = (input: SetPrimaryEmailInput) => {
    const edge = emails?.edges?.find((edge) => edge.node.primary);
    if (!edge?.node || edge.node.email === input.email) return;

    setPrimaryEmailMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("设置成功", { variant: "success" });
      },
      update(cache) {
        cache.modify({
          id: cache.identify(edge.node),
          fields: {
            primary(existingRefs) {
              return !existingRefs;
            },
          },
        });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  const onDelete = (input: DeleteEmailInput) => {
    deleteEmailMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("已删除", { variant: "success" });
      },
      update(cache, { data }) {
        const email = data?.payload?.email;
        if (!email || !qData?.viewer) return;

        cache.modify({
          id: cache.identify(qData.viewer),
          fields: {
            emails(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: EmailEdge) => readField("id", edge.node) !== email.id
              );
              return { ...existingRefs, edges };
            },
            unconfirmedEmails(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: EmailEdge) => readField("id", edge.node) !== email.id
              );
              return { ...existingRefs, edges };
            },
          },
        });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else if (!emails || !unconfirmedEmails) {
    return <ErrorPage message="客户端查询出错" />;
  }

  return (
    <Layout.Profile>
      <EmailsPaper
        emails={emails}
        unconfirmedEmails={unconfirmedEmails}
        onCreate={onCreate}
        onDelete={onDelete}
      />
      <SetPrimaryEmailPaper emails={emails} onSetPrimary={onSetPrimary} />
      <AddEmailPaper onCreate={onCreate} />
    </Layout.Profile>
  );
}

export default Emails;
