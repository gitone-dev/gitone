import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  CreateMemberInput,
  MemberEdge,
  useCreateMemberMutation,
  useProjectQuery,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import { useFullPath } from "../../../utils/router";
import Header, { useSearch } from "./Header";
import MembersContainer from "./MembersContainer";
import NewDialog from "./NewPaper";

function Members() {
  const [open, setOpen] = useState(false);
  const { fullPath } = useFullPath();
  const { orderField, query, access } = useSearch();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useProjectQuery({
    variables: { fullPath },
  });
  const policy = data?.projectPolicy;

  const [createMemberMutation] = useCreateMemberMutation();

  const onCreate = (input: CreateMemberInput) => {
    createMemberMutation({
      variables: { input },
      update(cache, { data: result }) {
        const member = result?.payload?.member;
        if (!member || !data?.project.id) return;

        cache.modify({
          id: cache.identify(data.project),
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

  const onClick = () => setOpen(true);
  const onClose = () => setOpen(false);

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ChunkPaper primary="成员列表">
      <Header poliicy={policy} onClick={onClick} />
      <MembersContainer
        fullPath={fullPath}
        policy={policy}
        query={query}
        access={access}
        orderField={orderField}
      />
      <NewDialog
        namespaceId={data.project.id}
        policy={policy}
        open={open}
        onClose={onClose}
        onCreate={onCreate}
      />
    </ChunkPaper>
  );
}

export default Members;
