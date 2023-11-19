import {
  BranchEdge,
  BranchOrderField,
  DeleteBranchInput,
  Maybe,
  OrderDirection,
  Policy,
  useBranchesQuery,
  useDeleteBranchMutation,
} from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import ListBranch from "./ListBranch";

interface Props {
  fullPath: string;
  policy: Policy;
  query?: Maybe<string>;
  orderField: BranchOrderField;
  orderDirection: OrderDirection;
}

function BranchesContainer(props: Props) {
  const { fullPath, policy, query, orderField, orderDirection } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, fetchMore } = useBranchesQuery({
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
  const edges = data?.repository?.branches?.edges;
  const pageInfo = data?.repository?.branches?.pageInfo;

  const [deleteBranchMutation] = useDeleteBranchMutation();

  const onDelete = (input: DeleteBranchInput) => {
    deleteBranchMutation({
      variables: { input },
      update(cache, { data: result }) {
        const { branch, repositoryId } = result?.payload || {};
        if (!branch || !repositoryId) return;

        cache.modify({
          id: cache.identify({ __typename: "Repository", id: repositoryId }),
          fields: {
            branches(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: BranchEdge) => readField("id", edge.node) !== branch.id
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
    <ListBranch
      fullPath={fullPath}
      policy={policy}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
      onDelete={onDelete}
    />
  );
}

export default BranchesContainer;
