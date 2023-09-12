import { Visibility } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import GroupsContainer, {
  Header,
  useSearch,
} from "../../../shared/GroupsContainer";

function Groups() {
  const { query, orderField } = useSearch({ isViewer: false });

  return (
    <ChunkPaper primary="组织列表">
      <Header isViewer={false} />
      <GroupsContainer
        query={query}
        visibility={Visibility.Public}
        orderField={orderField}
      />
    </ChunkPaper>
  );
}

export default Groups;
