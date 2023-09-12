import { Visibility } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import GroupsContainer, {
  Header,
  useSearch,
} from "../../../shared/GroupsContainer";
import { useFullPath } from "../../../utils/router";

function Groups() {
  const username = useFullPath();
  const { query, orderField } = useSearch({ isViewer: false });

  return (
    <ChunkPaper primary="组织列表">
      <Header isViewer={false} />
      <GroupsContainer
        username={username}
        query={query}
        visibility={Visibility.Public}
        orderField={orderField}
      />
    </ChunkPaper>
  );
}

export default Groups;
