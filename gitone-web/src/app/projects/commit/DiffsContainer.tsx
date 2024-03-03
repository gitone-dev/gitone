import { useDiffsQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useEffect } from "react";
import Diffs from "./Diffs";

interface Props {
  fullPath: string;
  leftRevision: string | undefined | null;
  rightRevision: string;
}

export default function DiffsContainer(props: Props) {
  const { fullPath, leftRevision, rightRevision } = props;

  const { data, loading, error, fetchMore } = useDiffsQuery({
    // fetchPolicy: "network-only",
    variables: {
      fullPath,
      leftRevision,
      rightRevision,
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
      leftRevision={leftRevision}
      rightRevision={rightRevision}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
    />
  );
}
