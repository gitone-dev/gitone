import ErrorBox from "@//shared/ErrorBox";
import UpdatePathPaper from "@/app/namespace/settings/UpdatePathPaper";
import { useViewerQuery } from "@/generated/types";
import LoadingBox from "@/shared/LoadingBox";

function Account() {
  const { data, loading, error } = useViewerQuery();

  const viewer = data?.viewer;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!viewer?.fullPath || !viewer.path) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <UpdatePathPaper
        primary="用户名"
        fullPath={viewer.fullPath}
        path={viewer.path}
      />
    </>
  );
}

export default Account;
