import { Action, useNamespaceQuery } from "../../../../generated/types";
import ErrorBox from "../../../../shared/ErrorBox";
import { useFullPath } from "../../../../utils/router";
import LoadingPage from "../../../LoadingPage";
import Groups from "../../../groups";
import Projects from "../../../projects";

function SshKeys() {
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
      <ErrorBox message="客户查询条件出错 src/pages/namespace/settings/sshKeys/index.tsx" />
    );
  } else if (!data.namespacePolicy.actions?.includes(Action.Update)) {
    return <ErrorBox message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Group":
      return (
        <Groups.Settings.SshKeys
          fullPath={fullPath}
          policy={data.namespacePolicy}
        />
      );
    case "Project":
      return (
        <Projects.Settings.SshKeys
          fullPath={fullPath}
          policy={data.namespacePolicy}
        />
      );
    default:
      return <ErrorBox message={`未知类型：${data.namespace.__typename}`} />;
  }
}

export default SshKeys;
