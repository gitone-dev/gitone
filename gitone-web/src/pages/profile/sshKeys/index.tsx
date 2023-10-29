import { useViewerQuery } from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import SshKeysContainer, {
  useSearch,
} from "../../namespace/settings/sshKeys/SshKeysContainer";

function SshKeys() {
  const { data, loading, error } = useViewerQuery();
  const { orderField, query } = useSearch();

  const viewer = data?.viewer;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!viewer?.fullPath || !viewer.path) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <SshKeysContainer
      fullPath={viewer.fullPath}
      query={query}
      orderField={orderField}
    />
  );
}

export default SshKeys;
