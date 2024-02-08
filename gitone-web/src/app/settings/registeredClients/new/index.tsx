import { useViewerQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import Form from "./Form";

export default function New() {
  const { data, loading, error } = useViewerQuery();

  const viewer = data?.viewer;
  const policy = data?.viewerPolicy;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!viewer?.fullPath || !viewer.path || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return <Form fullPath={viewer.fullPath} />;
}
