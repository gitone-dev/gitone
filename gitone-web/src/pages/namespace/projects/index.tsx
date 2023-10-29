import { Action, useNamespaceQuery } from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import { useFullPath } from "../../../utils/router";
import Groups from "../../groups";

function Projects() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!data?.namespace.fullPath) {
    return (
      <ErrorBox message="客户查询条件出错 src/pages/namespace/projects/index.tsx" />
    );
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorBox message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Group":
      return <Groups.Projects />;
    default:
      return <ErrorBox message={`未知类型：${data.namespace.__typename}`} />;
  }
}

export default Projects;
