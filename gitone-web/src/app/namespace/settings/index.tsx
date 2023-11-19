import LoadingPage from "@/app/LoadingPage";
import Groups from "@/app/groups";
import Projects from "@/app/projects";
import { Action, useNamespaceQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import { useFullPath } from "@/utils/router";

function Settings() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!data?.namespace.fullPath) {
    return (
      <ErrorBox message="客户查询条件出错 @/app/namespace/settings/index.tsx" />
    );
  } else if (!data.namespacePolicy.actions?.includes(Action.Update)) {
    return <ErrorBox message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Group":
      return <Groups.Settings.Settings />;
    case "Project":
      return <Projects.Settings.Settings />;
    default:
      return <ErrorBox message={`未知类型：${data.namespace.__typename}`} />;
  }
}

export default Settings;
