import { cache } from "../../../client";
import { ViewerDocument, ViewerQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import GroupsContainer, {
  Header,
  useSearch,
} from "../../../shared/GroupsContainer";

function Groups() {
  const { query, visibility, orderField } = useSearch({ isViewer: true });
  const viewer = cache.readQuery<ViewerQuery>({ query: ViewerDocument });

  return (
    <ChunkPaper primary="组织列表">
      <Header isViewer={true} />
      <GroupsContainer
        username={viewer?.viewer.username || ""}
        query={query}
        visibility={visibility}
        orderField={orderField}
      />
    </ChunkPaper>
  );
}

export default Groups;
