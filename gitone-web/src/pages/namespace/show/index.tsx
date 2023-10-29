import { Action, useNamespaceQuery } from "../../../generated/types";
import { useFullPath } from "../../../utils/router";
import ErrorPage from "../../ErrorPage";
import LoadingPage from "../../LoadingPage";
import Groups from "../../groups";
import Projects from "../../projects";
import Users from "../../users";

function Show() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else if (!data?.namespace.fullPath) {
    return <ErrorPage message="客户查询条件出错 src/pages/namespace/show/index.tsx" />;
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorPage message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Group":
      return <Groups.Show />;
    case "Project":
      return <Projects.Show />;
    case "User":
      return <Users.Show />;
    default:
      return <ErrorPage message={`未知类型：${data.namespace.__typename}`} />;
  }
}

export default Show;
