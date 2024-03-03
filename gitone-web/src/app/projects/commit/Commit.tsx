import { useRevisionPathQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useFullPath } from "@/utils/router";
import CommitContainer from "./CommitContainer";

export default function Commit() {
  const { fullPath, star: revisionPath } = useFullPath();
  const { data, loading, error } = useRevisionPathQuery({
    variables: { fullPath, revisionPath },
  });

  const revision = data?.repository.revisionPath?.revision;
  const path = data?.repository.revisionPath?.path;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!revision) {
    return <ErrorBox message="查询出错" />;
  }

  return (
    <CommitContainer fullPath={fullPath} revision={revision} path={path} />
  );
}
