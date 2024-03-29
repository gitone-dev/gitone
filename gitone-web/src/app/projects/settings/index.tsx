import UpdatePathPaper from "@/app/namespace/settings/UpdatePathPaper";
import UpdateVisibilityPaper from "@/app/namespace/settings/UpdateVisibilityPaper";
import { useProjectQuery } from "@/generated/types";
import AvatarPaper from "@/shared/AvatarPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useFullPath } from "@/utils/router";
import UpdatePaper from "./UpdatePaper";

function Settings() {
  const { fullPath, star } = useFullPath();
  const { data, loading, error } = useProjectQuery({
    variables: { fullPath, revisionPath: star },
  });

  const project = data?.project;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!project?.fullPath || !project.path || !project.avatarUrl) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <AvatarPaper avatarUrl={project.avatarUrl} />
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
