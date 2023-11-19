import { Policy } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import TagsContainer, { Header, useSearch } from "./TagsContainer";

interface Props {
  fullPath: string;
  policy: Policy;
}

function Tags(props: Props) {
  const { fullPath, policy } = props;
  const { query, orderField, orderDirection } = useSearch();

  return (
    <ChunkPaper primary="标签列表">
      <Header fullPath={fullPath} policy={policy} />
      <TagsContainer
        fullPath={fullPath}
        policy={policy}
        query={query}
        orderField={orderField}
        orderDirection={orderDirection}
      />
    </ChunkPaper>
  );
}

export default Tags;
