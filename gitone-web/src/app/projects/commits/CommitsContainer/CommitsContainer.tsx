import { RevisionPath, useCommitsQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useEffect } from "react";
import ListCommit from "./ListCommit";

interface Props {
  fullPath: string;
  revisionPath: RevisionPath;
  left?: string;
}

export default function CommitsContainer(props: Props) {
  const { fullPath, left, revisionPath } = props;

  const { data, loading, error, fetchMore } = useCommitsQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      first: 20,
      filterBy: {
        left: left,
        right: revisionPath.revision,
        path: revisionPath.path,
      },
    },
  });
  const edges = data?.repository?.commits?.edges;
  const pageInfo = data?.repository?.commits?.pageInfo;

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
  } else if (!edges || !pageInfo) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ListCommit
      fullPath={fullPath}
      revisionPath={revisionPath}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
    />
  );
}
