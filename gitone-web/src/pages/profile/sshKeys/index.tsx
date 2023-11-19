import { useViewerQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import SshKeysContainer, {
  Header,
  useSearch,
} from "../../namespace/settings/sshKeys/SshKeysContainer";

function SshKeys() {
  const { data, loading, error } = useViewerQuery();
  const { query, orderField, orderDirection } = useSearch();

  const viewer = data?.viewer;
  const policy = data?.viewerPolicy;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!viewer?.fullPath || !viewer.path || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ChunkPaper primary="SSH 公钥列表">
      <Header fullPath={viewer.fullPath} policy={policy} />
      <SshKeysContainer
        fullPath={viewer.fullPath}
        policy={policy}
        query={query}
        orderField={orderField}
        orderDirection={orderDirection}
      />
    </ChunkPaper>
  );
}

export default SshKeys;
