import { Action, useNamespaceQuery } from "../../../generated/types";
import { useFullPath } from "../../../utils/router";
import ErrorPage from "../../ErrorPage";
import LoadingPage from "../../LoadingPage";
import Projects from "../../projects";

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
    return (
      <ErrorPage message="客户查询条件出错 src/pages/namespace/branches/index.tsx" />
    );
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorPage message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Project":
      return <Projects.Tree />;
    default:
      return <ErrorPage message={`未知类型：${data.namespace.__typename}`} />;
  }
}

export default Show;
