import { useRevisionPathQuery } from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import { useFullPath } from "../../../utils/router";
import CommitContainer from "./CommitContainer";

function Show() {
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
    return <ErrorBox message="客户端查询条件错误：revision" />;
  }

  return (
    <CommitContainer fullPath={fullPath} revision={revision} path={path} />
  );
}

export default Show;
