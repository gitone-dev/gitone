import ErrorPage from "@/app/ErrorPage";
import LoadingPage from "@/app/LoadingPage";
import { Action, useNamespaceQuery } from "@/generated/types";
import { useFullPath } from "@/utils/router";
import Compare from "./Compare";

export default function Show() {
  const { fullPath, left, right } = useFullPath();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else if (!data?.namespace.fullPath) {
    return <ErrorPage message="查询出错" />;
  } else if (!data.namespacePolicy.actions?.includes(Action.Read)) {
    return <ErrorPage message="无权限" />;
  }

  switch (data.namespace.__typename) {
    case "Project":
      return <Compare fullPath={fullPath} left={left} right={right} />;
    default:
      return <ErrorPage message={`未知类型：${data.namespace.__typename}`} />;
  }
}
