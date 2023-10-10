import {
  Action,
  NamespaceType,
  useNamespaceQuery,
} from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import { useFullPath } from "../../../utils/router";
import LoadingPage from "../../LoadingPage";
import Groups from "../../groups";
import Projects from "../../projects";

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
    return <ErrorBox message="客户查询条件出错" />;
  } else if (!data.namespacePolicy.actions?.includes(Action.Update)) {
    return <ErrorBox message="无权限" />;
  }

  switch (data.namespace.type) {
    case NamespaceType.Group:
      return <Groups.Settings />;
    case NamespaceType.Project:
      return <Projects.Settings />;
    default:
      return <ErrorBox message={`未知类型：${data.namespace.type}`} />;
  }
}

export default Settings;
