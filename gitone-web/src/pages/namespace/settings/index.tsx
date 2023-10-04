import { Action, useNamespaceQuery } from "../../../generated/types";
import { fromGlobalId } from "../../../utils/relay";
import { useFullPath } from "../../../utils/router";
import ErrorPage from "../../ErrorPage";
import LoadingPage from "../../LoadingPage";
import Groups from "../../groups";

function Settings() {
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
  } else if (!data.namespacePolicy.actions?.includes(Action.Update)) {
    return <ErrorPage message="无权限" />;
  }

  const globalId = fromGlobalId(data.namespace.id);
  switch (globalId.type) {
    case "Group":
      return <Groups.Settings />;
    default:
      return <ErrorPage message={`${globalId.type} 未知类型`} />;
  }
}

export default Settings;