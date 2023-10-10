import {
  Action,
  NamespaceType,
  useNamespaceQuery,
} from "../../../generated/types";
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
    return <ErrorPage message="客户查询条件出错" />;
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorPage message="无权限" />;
  }

  switch (data.namespace.type) {
    case NamespaceType.Group:
      return <Groups.Show />;
    case NamespaceType.Project:
      return <Projects.Show />;
    case NamespaceType.User:
      return <Users.Show />;
    default:
      return <ErrorPage message={`未知类型：${data.namespace.type}`} />;
  }
}

export default Show;
