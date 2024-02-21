import LoadingPage from "@/app/LoadingPage";
import { Action, useNamespaceQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import { useFullPath } from "@/utils/router";
import RegisteredClients from "./RegisteredClients";

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
  } else if (!namespace?.fullPath) {
    return (
      <ErrorBox message="查询出错 namespace/settings/registered-clients/index" />
    );
  } else if (!policy?.actions?.includes(Action.Update)) {
    return <ErrorBox message="无权限" />;
  }

  switch (namespace.__typename) {
    case "User":
    case "Group":
      return (
        <RegisteredClients fullPath={namespace.fullPath} policy={policy} />
      );
    default:
      return <ErrorBox message={`未知类型：${namespace.__typename}`} />;
  }
}
