import LoadingPage from "@/app/LoadingPage";
import { Action, useNamespaceQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import { useFullPath } from "@/utils/router";
import SshKeys from "./SshKeys";

export default function Index() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  const namespace = data?.namespace;
  const policy = data?.namespacePolicy;

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!namespace?.fullPath || !policy) {
    return <ErrorBox message="客户出错 namespace/settings/sshKeys/index" />;
  } else if (!policy.actions?.includes(Action.Update)) {
    return <ErrorBox message="无权限" />;
  }

  switch (namespace.__typename) {
    case "Group":
    case "User":
    case "Project":
      return <SshKeys fullPath={namespace.fullPath} policy={policy} />;
    default:
      return <ErrorBox message={`未知类型：${namespace.__typename}`} />;
  }
}
