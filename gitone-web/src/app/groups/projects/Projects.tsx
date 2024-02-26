import { Action, useGroupQuery, useViewerQuery } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import ProjectsContainer, {
  Header,
  useSearch,
} from "@/shared/ProjectsContainer";
import { useFullPath } from "@/utils/router";

export default function Projects() {
  const { fullPath } = useFullPath();
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const isLoggedIn = Boolean(viewer);
  const { query, visibility, orderField } = useSearch({ isLoggedIn });
  const { data, loading, error } = useGroupQuery({
    variables: { fullPath },
  });

  const group = data?.group;
  const policy = data?.namespacePolicy;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!group || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ChunkPaper primary="项目列表">
      <Header
        isLoggedIn={isLoggedIn}
        canCreate={policy.actions.includes(Action.Update)}
        namespace={group}
      />
      <ProjectsContainer
        parentId={group.id}
        query={query}
        visibility={visibility}
        orderField={orderField}
        recursive={true}
      />
    </ChunkPaper>
  );
}
