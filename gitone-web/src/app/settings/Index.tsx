import { useViewerDetailQuery } from "@/generated/types";
import AvatarPaper from "@/shared/AvatarPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import UserDetailPaper from "./UserDetailPaper";

export default function Index() {
  const { data, loading, error } = useViewerDetailQuery();

  const viewer = data?.viewer;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!viewer || !viewer.avatarUrl) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <AvatarPaper avatarUrl={viewer.avatarUrl || ""} />
      <UserDetailPaper viewer={viewer} />
    </>
  );
}
