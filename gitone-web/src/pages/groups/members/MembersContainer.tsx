import { useSnackbar } from "notistack";
import { useEffect } from "react";
import {
  Access,
  DeleteMemberInput,
  Maybe,
  MemberEdge,
  MemberOrderField,
  OrderDirection,
  Policy,
  UpdateMemberInput,
  useDeleteMemberMutation,
  useGroupMembersQuery,
  useUpdateMemberMutation,
} from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import TableMember from "../../../shared/TableMember";

interface Props {
  fullPath: string;
  policy: Policy;
  query?: Maybe<string>;
  access: Maybe<Access>;
  orderField: MemberOrderField;
}

function MembersContainer(props: Props) {
  const { fullPath, policy, query, access, orderField } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, fetchMore } = useGroupMembersQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      first: 20,
      filterBy: { query, access },
      orderBy: {
        direction:
          orderField === MemberOrderField.Username
            ? OrderDirection.Asc
            : OrderDirection.Desc,
        field: orderField,
      },
    },
  });
  const namespaceId = data?.group.id;
  const edges = data?.group?.members?.edges;
  const pageInfo = data?.group?.members?.pageInfo;

  const [updateMemberMutation] = useUpdateMemberMutation();
  const [deleteMemberMutation] = useDeleteMemberMutation();

  const onUpdate = (input: UpdateMemberInput) => {
    updateMemberMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("修改成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  const onDelete = (input: DeleteMemberInput) => {
    deleteMemberMutation({
      variables: { input },
      update(cache, { data: result }) {
        const member = result?.payload?.member;
        if (!member || !data?.group.id) return;

        cache.modify({
          id: cache.identify(data.group),
          fields: {
            members(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: MemberEdge) => readField("id", edge.node) !== member.id
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
  } else if (!namespaceId || !edges || !pageInfo || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <TableMember
      namespaceId={namespaceId}
      policy={policy}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}

export default MembersContainer;
