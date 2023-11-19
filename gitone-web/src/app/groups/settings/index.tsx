import UpdatePathPaper from "@/app/namespace/settings/UpdatePathPaper";
import UpdateVisibilityPaper from "@/app/namespace/settings/UpdateVisibilityPaper";
import { useGroupQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useFullPath } from "@/utils/router";
import UpdatePaper from "./UpdatePaper";

function Settings() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useGroupQuery({
    variables: { fullPath },
  });

  const group = data?.group;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!group?.fullPath || !group.path) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <UpdatePaper group={group} />
      <UpdatePathPaper
        primary="路径"
        fullPath={group.fullPath}
        path={group.path}
      />
      <UpdateVisibilityPaper
        fullPath={group.fullPath}
        visibility={group.visibility}
      />
    </>
  );
}

export default Settings;
