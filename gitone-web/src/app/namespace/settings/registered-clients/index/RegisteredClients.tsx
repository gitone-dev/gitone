import RegisteredClientsContainer, {
  Header,
  useSearch,
} from "@/app/namespace/settings/registered-clients/index/registeredClientsContainer";
import { Policy } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";

interface Props {
  fullPath: string;
  policy: Policy;
}

export default function RegisteredClients(props: Props) {
  const { fullPath, policy } = props;
  const { query, orderField, orderDirection } = useSearch();

  return (
    <ChunkPaper primary="OIDC 客户端">
      <Header fullPath={fullPath} policy={policy} />
      <RegisteredClientsContainer
        fullPath={fullPath}
        policy={policy}
        query={query}
        orderField={orderField}
        orderDirection={orderDirection}
      />
    </ChunkPaper>
  );
}
