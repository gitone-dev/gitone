import { RevisionPath, useTreeQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useEffect } from "react";
import TableTree from "./TableTree";

interface Props {
  fullPath: string;
  revisionPath: RevisionPath;
}

function TreeContainer(props: Props) {
  const { fullPath, revisionPath } = props;

  const { data, loading, error, fetchMore } = useTreeQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      revision: revisionPath.revision,
      path: revisionPath.path,
    },
  });

  const edges = data?.repository?.tree?.edges;
  const pageInfo = data?.repository?.tree?.pageInfo;
  const policy = data?.namespacePolicy;

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
      <TableTree
        fullPath={fullPath}
        revision={revisionPath.revision}
        edges={edges}
        pageInfo={pageInfo}
        loadMore={onScroll}
      />
  );
}

export default TreeContainer;
