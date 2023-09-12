import { useViewerDetailQuery } from "../../generated/types";
import ErrorBox from "../../shared/ErrorBox";
import LoadingBox from "../../shared/LoadingBox";
import AvatarPaper from "./AvatarPaper";
import UserDetailPaper from "./UserDetailPaper";

function Index() {
  const { data, loading, error } = useViewerDetailQuery();

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!data?.viewer) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <AvatarPaper avatarUrl={data.viewer.avatarUrl} />
      <UserDetailPaper viewer={data.viewer} />
    </>
  );
}

export default Index;
