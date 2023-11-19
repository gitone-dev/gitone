import { useDiffQuery } from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import Diffs from "./Diffs";

interface Props {
  fullPath: string;
  oldSha: string | undefined | null;
  newSha: string;
}

function DiffsContainer(props: Props) {
  const { fullPath, oldSha, newSha } = props;

  const { data, loading, error } = useDiffQuery({
    variables: { fullPath, oldRevision: oldSha, newRevision: newSha },
  });

  const edges = data?.repository.diffs?.edges;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!edges) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return <Diffs sx={{ mt: 2 }} fullPath={fullPath} edges={edges} />;
}

export default DiffsContainer;
