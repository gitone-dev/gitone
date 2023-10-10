import { useViewerQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import GroupsContainer, {
  Header,
  useSearch,
} from "../../../shared/GroupsContainer";

function Groups() {
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const isViewer = Boolean(viewer);
  const { query, visibility, orderField } = useSearch({ isViewer });

  return (
    <ChunkPaper primary="组织列表">
      <Header isViewer={isViewer} />
      <GroupsContainer
        query={query}
        visibility={visibility}
        orderField={orderField}
      />
    </ChunkPaper>
  );
}

export default Groups;
