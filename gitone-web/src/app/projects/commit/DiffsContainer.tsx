import { useDiffsQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import Diffs from "./Diffs";
import { useEffect } from "react";

interface Props {
  fullPath: string;
  oldSha: string | undefined | null;
  newSha: string;
}

function DiffsContainer(props: Props) {
  const { fullPath, oldSha, newSha } = props;

  const { data, loading, error, fetchMore } = useDiffsQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      oldRevision: oldSha,
      newRevision: newSha,
    },
  });
  const edges = data?.repository.diffs?.edges;
  const pageInfo = data?.repository?.diffs?.pageInfo;

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
    <Diffs
      sx={{ mt: 2 }}
      fullPath={fullPath}
      oldRevision={oldSha}
      newRevision={newSha}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
    />
  );
}

export default DiffsContainer;
