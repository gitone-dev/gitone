import { Policy } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import BranchesContainer, { Header, useSearch } from "./BranchesContainer";

interface Props {
  fullPath: string;
  policy: Policy;
}

export default function Branches(props: Props) {
  const { fullPath, policy } = props;
  const { query, orderField, orderDirection } = useSearch();

  return (
    <ChunkPaper primary="分支列表">
      <Header fullPath={fullPath} policy={policy} />
      <BranchesContainer
        fullPath={fullPath}
        policy={policy}
        query={query}
        orderField={orderField}
        orderDirection={orderDirection}
      />
    </ChunkPaper>
  );
}
