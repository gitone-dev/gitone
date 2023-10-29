import SshKeysContainer, {
  useSearch,
} from "../../../namespace/settings/sshKeys/SshKeysContainer";
import { useFullPath } from "../../../../utils/router";

function SshKeys() {
  const { fullPath } = useFullPath();
  const { orderField, query } = useSearch();

  return (
    <SshKeysContainer
      fullPath={fullPath}
      query={query}
      orderField={orderField}
    />
  );
}

export default SshKeys;
