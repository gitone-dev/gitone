import { Action, useNamespaceQuery } from "../generated/types";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import { fromGlobalId } from "../utils/relay";
import { useFullPath } from "../utils/router";
import Group from "./Group";
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
    return <ErrorPage message="客户查询条件出错" />;
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorPage message="无权限" />;
  }
  const globalId = fromGlobalId(data.namespace.id);
  switch (globalId.type) {
    case "UserNamespace":
      return <User />;
    case "Group":
      return <Group />;
    default:
      return <ErrorPage message={`${globalId.type} 未知类型`} />;
  }
}

export default Namespace;
