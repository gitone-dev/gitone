import { useSnackbar } from "notistack";
import { useEffect } from "react";
import {
  DeleteTagInput,
  Maybe,
  OrderDirection,
  Policy,
  TagEdge,
  TagOrderField,
  useDeleteTagMutation,
  useTagsQuery,
} from "../../../../generated/types";
import ErrorBox from "../../../../shared/ErrorBox";
import LoadingBox from "../../../../shared/LoadingBox";
import ListTag from "./ListTag";

interface Props {
  fullPath: string;
  policy: Policy;
  query?: Maybe<string>;
  orderField: TagOrderField;
  orderDirection: OrderDirection;
}

function TagsContainer(props: Props) {
  const { fullPath, policy, query, orderField, orderDirection } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, fetchMore } = useTagsQuery({
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
  const edges = data?.repository?.tags?.edges;
  const pageInfo = data?.repository?.tags?.pageInfo;

  const [deleteTagMutation] = useDeleteTagMutation();

  const onDelete = (input: DeleteTagInput) => {
    deleteTagMutation({
      variables: { input },
      update(cache, { data: result }) {
        const { tag, repositoryId } = result?.payload || {};
        if (!tag || !repositoryId) return;

        cache.modify({
          id: cache.identify({ __typename: "Repository", id: repositoryId }),
          fields: {
            tags(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: TagEdge) => readField("id", edge.node) !== tag.id
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
    <ListTag
      fullPath={fullPath}
      policy={policy}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
      onDelete={onDelete}
    />
  );
}

export default TagsContainer;
