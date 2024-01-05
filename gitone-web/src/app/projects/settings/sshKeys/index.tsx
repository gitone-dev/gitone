import SshKeysContainer, {
  Header,
  useSearch,
} from "@/app/namespace/settings/sshKeys/SshKeysContainer";
import { Policy } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";

interface Props {
  fullPath: string;
  policy: Policy;
}

function SshKeys(props: Props) {
  const { fullPath, policy } = props;
  const { query, orderField, orderDirection } = useSearch();

  return (
    <ChunkPaper primary="SSH 公钥列表">
      <Header fullPath={fullPath} policy={policy} />
      <SshKeysContainer
        fullPath={fullPath}
        policy={policy}
        query={query}
        orderField={orderField}
        orderDirection={orderDirection}
      />
    </ChunkPaper>
  );
}

export default SshKeys;