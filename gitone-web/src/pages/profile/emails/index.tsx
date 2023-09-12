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
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import EmailsPaper from "./EmailsPaper";
import SetPrimaryEmailPaper from "./SetPrimaryEmailPaper";

function Emails() {
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useViewerEmailsQuery();
  const [createEmailMutation] = useCreateEmailMutation();
  const [setPrimaryEmailMutation] = useSetPrimaryEmailMutation();
  const [deleteEmailMutation] = useDeleteEmailMutation();

  const emails = data?.viewer.emails;
  const unconfirmedEmails = data?.viewer.unconfirmedEmails;

  const onCreate = (input: CreateEmailInput) => {
    createEmailMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("激活邮件已发送，请注意查收", { variant: "success" });
      },
      update(cache, { data: result }) {
        const email = result?.payload?.email;
        if (!email || !data?.viewer) return;

        cache.modify({
          id: cache.identify(data.viewer),
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
      update(cache, { data: result }) {
        const email = result?.payload?.email;
        if (!email || !data?.viewer) return;

        cache.modify({
          id: cache.identify(data.viewer),
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
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!emails || !unconfirmedEmails) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <EmailsPaper
        emails={emails}
        unconfirmedEmails={unconfirmedEmails}
        onCreate={onCreate}
        onDelete={onDelete}
      />
      <SetPrimaryEmailPaper emails={emails} onSetPrimary={onSetPrimary} />
    </>
  );
}

export default Emails;
