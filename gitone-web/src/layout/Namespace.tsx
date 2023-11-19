import ErrorPage from "@/app/ErrorPage";
import LoadingPage from "@/app/LoadingPage";
import { Action, useNamespaceQuery } from "@/generated/types";
import { useFullPath } from "@/utils/router";
import Group from "./Group";
import Project from "./Project";
import User from "./User";

function Namespace() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else if (!data?.namespace.fullPath) {
    return <ErrorPage message="客户查询条件出错 src/layout/Namespace.tsx" />;
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorPage message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Group":
      return <Group />;
    case "Project":
      return <Project />;
    case "User":
      return <User />;
    default:
      return <ErrorPage message={`未知类型：${data.namespace.__typename}`} />;
  }
}

export default Namespace;
