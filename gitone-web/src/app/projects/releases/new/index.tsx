import { Action, Tag, useNamespaceQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useFullPath } from "@/utils/router";
import { useLocation } from "react-router-dom";
import Form from "./Form";

export default function New() {
  const { fullPath } = useFullPath();
  const location = useLocation();
  const { data, loading, error } = useNamespaceQuery({
    variables: { fullPath },
  });

  const namespace = data?.namespace;
  const policy = data?.namespacePolicy;
  const tag = location.state as Tag;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!namespace?.fullPath) {
    return <ErrorBox message="查询出错" />;
  } else if (!policy?.actions?.includes(Action.Update)) {
    return <ErrorBox message="无权限" />;
  }

  switch (namespace.__typename) {
    case "Project":
      return <Form fullPath={namespace.fullPath} tag={tag} />;
    default:
      return <ErrorBox message={`未知类型：${namespace.__typename}`} />;
  }
}
