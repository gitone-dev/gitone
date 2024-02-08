import RegisteredClientsContainer, {
  Header,
  useSearch,
} from "@/app/settings/registeredClients/registeredClientsContainer";
import { useViewerQuery } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";

export default function RegisteredClients() {
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
    <ChunkPaper primary="OIDC 客户端">
      <Header fullPath={viewer.fullPath} policy={policy} />
      <RegisteredClientsContainer
        fullPath={viewer.fullPath}
        policy={policy}
        query={query}
        orderField={orderField}
        orderDirection={orderDirection}
      />
    </ChunkPaper>
  );
}
