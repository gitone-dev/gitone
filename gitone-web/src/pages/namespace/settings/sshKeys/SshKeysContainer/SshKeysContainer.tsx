import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  CreateSshKeyInput,
  DeleteSshKeyInput,
  Maybe,
  OrderDirection,
  SshKeyEdge,
  SshKeyOrderField,
  UpdateSshKeyInput,
  useCreateSshKeyMutation,
  useDeleteSshKeyMutation,
  useSshKeysQuery,
  useUpdateSshKeyMutation,
} from "../../../../../generated/types";
import ChunkPaper from "../../../../../shared/ChunkPaper";
import ErrorBox from "../../../../../shared/ErrorBox";
import LoadingBox from "../../../../../shared/LoadingBox";
import Header from "./Header";
import ListSshKey from "./ListSshKey";
import NewDialog from "./NewDialog";

interface Props {
  fullPath: string;
  query?: Maybe<string>;
  orderField: SshKeyOrderField;
}

function SshKeysContainer(props: Props) {
  const { fullPath, query, orderField } = props;
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, fetchMore } = useSshKeysQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      first: 20,
      filterBy: { query },
      orderBy: {
        direction: OrderDirection.Desc,
        field: orderField,
      },
    },
  });
  const edges = data?.sshKeys?.edges;
  const pageInfo = data?.sshKeys?.pageInfo;
  const policy = data?.namespacePolicy;

  const [createSshKeyMutation] = useCreateSshKeyMutation();
  const [updateSshKeyMutation] = useUpdateSshKeyMutation();
  const [deleteSshKeyMutation] = useDeleteSshKeyMutation();

  const onCreate = (input: CreateSshKeyInput) => {
    createSshKeyMutation({
      variables: { input },
      update(cache, { data: result }) {
        const sshKey = result?.payload?.sshKey;
        if (!sshKey) return;

        cache.modify({
          fields: {
            sshKeys(existingRefs = {}, { toReference, readField }) {
              if (
                existingRefs.edges?.some(
                  (edge: SshKeyEdge) => readField("id", edge.node) === sshKey.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "SshKeyEdge",
                    node: toReference(sshKey),
                  },
                ],
              };
            },
          },
        });
      },
      onCompleted() {
        enqueueSnackbar("添加成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  const onUpdate = (input: UpdateSshKeyInput) => {
    updateSshKeyMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("修改成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  const onDelete = (input: DeleteSshKeyInput) => {
    deleteSshKeyMutation({
      variables: { input },
      update(cache, { data: result }) {
        const sshKey = result?.payload?.sshKey;
        if (!sshKey) return;

        cache.modify({
          fields: {
            sshKeys(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: SshKeyEdge) => readField("id", edge.node) !== sshKey.id
              );
              return { ...existingRefs, edges };
            },
          },
        });
      },
      onCompleted() {
        enqueueSnackbar("删除成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  const onClick = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onScroll = () => {
    if (loading) return;
    if (!pageInfo?.hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight + 16 < scrollHeight) return;

    fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!edges || !pageInfo || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ChunkPaper primary="SSH 公钥列表">
      <Header poliicy={policy} onClick={onClick} />
      <ListSshKey
        fullPath={fullPath}
        policy={policy}
        edges={edges}
        pageInfo={pageInfo}
        loadMore={onScroll}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      <NewDialog
        fullPath={fullPath}
        open={open}
        onClose={onClose}
        onCreate={onCreate}
      />
    </ChunkPaper>
  );
}

export default SshKeysContainer;
