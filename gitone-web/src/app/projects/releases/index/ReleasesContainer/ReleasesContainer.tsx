import {
  DeleteReleaseInput,
  Maybe,
  OrderDirection,
  Policy,
  ReleaseEdge,
  ReleaseOrderField,
  useDeleteReleaseMutation,
  useReleasesQuery,
} from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import ListRelease from "./ListRelease";

interface Props {
  fullPath: string;
  policy: Policy;
  query?: Maybe<string>;
  orderField: ReleaseOrderField;
  orderDirection: OrderDirection;
}

export default function ReleasesContainer(props: Props) {
  const { fullPath, policy, query, orderField, orderDirection } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, fetchMore } = useReleasesQuery({
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
  const edges = data?.releases?.edges;
  const pageInfo = data?.releases?.pageInfo;

  const [deleteReleaseMutation] = useDeleteReleaseMutation();

  const onDelete = (input: DeleteReleaseInput) => {
    deleteReleaseMutation({
      variables: { input },
      update(cache, { data: result }) {
        const release = result?.payload?.release;
        if (!release) return;

        cache.modify({
          fields: {
            releases(existingRefs = {}, { readField }) {
              const edges = existingRefs.edges?.filter(
                (edge: ReleaseEdge) => readField("id", edge.node) !== release.id
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
    <ListRelease
      fullPath={fullPath}
      policy={policy}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
      onDelete={onDelete}
    />
  );
}
