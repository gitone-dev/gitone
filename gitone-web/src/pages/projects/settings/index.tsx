import { useProjectQuery } from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import { useFullPath } from "../../../utils/router";
import UpdatePathPaper from "../../namespace/settings/UpdatePathPaper";
import UpdateVisibilityPaper from "../../namespace/settings/UpdateVisibilityPaper";
import UpdatePaper from "./UpdatePaper";

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
  } else if (!project?.fullPath || !project.path) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <UpdatePaper project={project} />
      <UpdatePathPaper
        primary="路径"
        fullPath={project.fullPath}
        path={project.path}
      />
      <UpdateVisibilityPaper
        fullPath={project.fullPath}
        visibility={project.visibility}
      />
    </>
  );
}

export default Settings;
