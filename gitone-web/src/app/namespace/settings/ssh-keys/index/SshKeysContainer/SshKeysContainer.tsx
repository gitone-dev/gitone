import {
  DeleteSshKeyInput,
  Maybe,
  OrderDirection,
  Policy,
  SshKeyEdge,
  SshKeyOrderField,
  UpdateSshKeyInput,
  useDeleteSshKeyMutation,
  useSshKeysQuery,
  useUpdateSshKeyMutation,
} from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import ListSshKey from "./ListSshKey";

interface Props {
  fullPath: string;
  policy: Policy;
  query?: Maybe<string>;
  orderField: SshKeyOrderField;
  orderDirection: OrderDirection;
}

export default function SshKeysContainer(props: Props) {
  const { fullPath, policy, query, orderField, orderDirection } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, fetchMore } = useSshKeysQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      first: 20,
      filterBy: { query },
      orderBy: {
        direction: orderDirection,
        field: orderField,
      },
    },
  });
  const edges = data?.sshKeys?.edges;
  const pageInfo = data?.sshKeys?.pageInfo;

  const [updateSshKeyMutation] = useUpdateSshKeyMutation();
  const [deleteSshKeyMutation] = useDeleteSshKeyMutation();

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
    <ListSshKey
      fullPath={fullPath}
      policy={policy}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
