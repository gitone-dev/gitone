import { Action, useNamespaceQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useFullPath } from "@/utils/router";
import Members from "./Members";

export default function Index() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!data?.namespace.fullPath) {
    return <ErrorBox message="查询出错 namespace/members" />;
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorBox message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Group":
    case "Project":
      return <Members />;
    default:
      return <ErrorBox message={`未知类型：${data.namespace.__typename}`} />;
  }
}
