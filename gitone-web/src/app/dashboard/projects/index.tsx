import { useViewerQuery } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import ProjectsContainer, {
  Header,
  useSearch,
} from "@/shared/ProjectsContainer";

function Projects() {
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const isViewer = Boolean(viewer);
  const { query, visibility, orderField } = useSearch({ isViewer });

  return (
    <ChunkPaper primary="项目列表">
      <Header isViewer={isViewer} />
      <ProjectsContainer
        username={viewer?.username || ""}
        query={query}
        visibility={visibility}
        orderField={orderField}
        recursive={true}
      />
    </ChunkPaper>
  );
}

export default Projects;
