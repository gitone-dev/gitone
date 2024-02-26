import { useViewerQuery } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import GroupsContainer, {
  Header,
  useSearch,
} from "@/shared/GroupsContainer";
import { useFullPath } from "@/utils/router";

export default function Groups() {
  const { fullPath: username } = useFullPath();
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const isLoggedIn = Boolean(viewer);
  const { query, visibility, orderField } = useSearch({ isLoggedIn });

  return (
    <ChunkPaper primary="组织列表">
      <Header isLoggedIn={isLoggedIn} />
      <GroupsContainer
        username={username}
        query={query}
        visibility={visibility}
        orderField={orderField}
      />
    </ChunkPaper>
  );
}

