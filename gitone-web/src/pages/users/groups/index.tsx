import { cache } from "../../../client";
import { ViewerDocument, ViewerQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import GroupsContainer, {
  Header,
  useSearch,
} from "../../../shared/GroupsContainer";
import { useFullPath } from "../../../utils/router";

function Groups() {
  const { fullPath: username } = useFullPath();
  const viewer = cache.readQuery<ViewerQuery>({ query: ViewerDocument });
  const isViewer = Boolean(viewer);
  const { query, visibility, orderField } = useSearch({ isViewer });

  return (
    <ChunkPaper primary="组织列表">
      <Header isViewer={isViewer} />
      <GroupsContainer
        username={username}
        query={query}
        visibility={visibility}
        orderField={orderField}
      />
    </ChunkPaper>
  );
}

export default Groups;
