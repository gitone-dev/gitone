import { useViewerQuery } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import ProjectsContainer, {
  Header,
  useSearch,
} from "@/shared/ProjectsContainer";
import { useFullPath } from "@/utils/router";

export default function Projects() {
  const { fullPath: username } = useFullPath();
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const isLoggedIn = Boolean(viewer);
  const { query, visibility, orderField } = useSearch({ isLoggedIn });

  return (
    <ChunkPaper primary="项目列表">
      <Header isLoggedIn={isLoggedIn} />
      <ProjectsContainer
        username={username}
        query={query}
        visibility={visibility}
        orderField={orderField}
        recursive={true}
      />
    </ChunkPaper>
  );
}
