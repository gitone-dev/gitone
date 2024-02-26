import UpdatePathPaper from "@/app/namespace/settings/UpdatePathPaper";
import UpdateVisibilityPaper from "@/app/namespace/settings/UpdateVisibilityPaper";
import { useGroupQuery } from "@/generated/types";
import AvatarPaper from "@/shared/AvatarPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useFullPath } from "@/utils/router";
import UpdatePaper from "./UpdatePaper";

export default function Settings() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useGroupQuery({
    variables: { fullPath },
  });

  const group = data?.group;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!group?.fullPath || !group.path || !group.avatarUrl) {
    return <ErrorBox message="查询错误" />;
  }

  return (
    <>
      <AvatarPaper avatarUrl={group.avatarUrl} />
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
