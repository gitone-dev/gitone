import { useProjectQuery } from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import { useFullPath } from "../../../utils/router";
import UpdatePaper from "./UpdatePaper";
import UpdatePathPaper from "./UpdatePathPaper";
import UpdateVisibilityPaper from "./UpdateVisibilityPaper";

function Settings() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useProjectQuery({
    variables: { fullPath },
  });

  const project = data?.project;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!project) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <UpdatePaper project={project} />
      <UpdatePathPaper project={project} />
      <UpdateVisibilityPaper project={project} />
    </>
  );
}

export default Settings;
