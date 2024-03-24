import { Policy } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import ReleasesContainer, { Header, useSearch } from "./ReleasesContainer";

interface Props {
  fullPath: string;
  policy: Policy;
}

export default function Releases(props: Props) {
  const { fullPath, policy } = props;
  const { query, orderField, orderDirection } = useSearch();

  return (
    <ChunkPaper primary="发布列表">
      <Header fullPath={fullPath} policy={policy} />
      <ReleasesContainer
        fullPath={fullPath}
        policy={policy}
        query={query}
        orderField={orderField}
        orderDirection={orderDirection}
      />
    </ChunkPaper>
  );
}
