import { Action, useNamespaceQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useFullPath } from "@/utils/router";
import Form from "./Form";

export default function New() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  const namespace = data?.namespace;
  const policy = data?.namespacePolicy;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!namespace?.fullPath) {
    return <ErrorBox message="查询出错 namespace/settings/sshKeys/index.tsx" />;
  } else if (!policy?.actions?.includes(Action.Update)) {
    return <ErrorBox message="无权限" />;
  }

  switch (namespace.__typename) {
    case "Group":
    case "User":
      return <Form fullPath={namespace.fullPath} />;
    default:
      return <ErrorBox message={`未知类型：${namespace.__typename}`} />;
  }
}
