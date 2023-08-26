import { useViewerDetailQuery } from "../../generated/types";
import Layout from "../../layout";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";
import AvatarPaper from "./AvatarPaper";
import UserDetailPaper from "./UserDetailPaper";

function Index() {
  const { data, loading, error } = useViewerDetailQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else if (!data?.viewer) {
    return <ErrorPage message="客户端查询出错" />;
  }

  return (
    <Layout.Profile>
      <AvatarPaper avatarUrl={data.viewer.avatarUrl} />
      <UserDetailPaper viewer={data.viewer} />
    </Layout.Profile>
  );
}

export default Index;
