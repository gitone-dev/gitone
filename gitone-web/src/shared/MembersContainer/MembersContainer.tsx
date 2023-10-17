import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  Access,
  CreateMemberInput,
  DeleteMemberInput,
  Maybe,
  MemberEdge,
  MemberOrderField,
  OrderDirection,
  UpdateMemberInput,
  useCreateMemberMutation,
  useDeleteMemberMutation,
  useMembersQuery,
  useUpdateMemberMutation
} from "../../generated/types";
import ChunkPaper from "../ChunkPaper";
import ErrorBox from "../ErrorBox";
import LoadingBox from "../LoadingBox";
import Header from "./Header";
import NewDialog from "./NewPaper";
import TableMember from "./TableMember";

interface Props {
  fullPath: string;
  query?: Maybe<string>;
  access: Maybe<Access>;
  orderField: MemberOrderField;
}

function MembersContainer(props: Props) {
  const { fullPath, query, access, orderField } = props;
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, fetchMore } = useMembersQuery({
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
  const edges = data?.members?.edges;
  const pageInfo = data?.members?.pageInfo;
  const policy = data?.namespacePolicy;

  const [createMemberMutation] = useCreateMemberMutation();
  const [updateMemberMutation] = useUpdateMemberMutation();
  const [deleteMemberMutation] = useDeleteMemberMutation();

  const onCreate = (input: CreateMemberInput) => {
    createMemberMutation({
      variables: { input },
      update(cache, { data: result }) {
        const member = result?.payload?.member;
        if (!member) return;

        cache.modify({
          fields: {
            members(existingRefs = {}, { toReference, readField }) {
              if (
                existingRefs.edges?.some(
                  (edge: MemberEdge) => readField("id", edge.node) === member.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "MemberEdge",
                    node: toReference(member),
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
        if (!member) return;

        cache.modify({
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
    <ChunkPaper primary="成员列表">
      <Header poliicy={policy} onClick={onClick} />
      <TableMember
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
        policy={policy}
        open={open}
        onClose={onClose}
        onCreate={onCreate}
      />
    </ChunkPaper>
  );
}

export default MembersContainer;
