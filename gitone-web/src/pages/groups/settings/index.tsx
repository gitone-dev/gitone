import { useGroupQuery } from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import { useFullPath } from "../../../utils/router";
import UpdatePaper from "./UpdatePaper";
import UpdatePathPaper from "./UpdatePathPaper";
import UpdateVisibilityPaper from "./UpdateVisibilityPaper";

function Settings() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useGroupQuery({
    variables: { fullPath },
  });

  const group = data?.group;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!group) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <UpdatePaper group={group} />
      <UpdatePathPaper group={group} />
      <UpdateVisibilityPaper group={group} />
    </>
  );
}

export default Settings;
