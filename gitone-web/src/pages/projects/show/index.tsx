import { useProjectQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import Descriptions, { Item } from "../../../shared/Descriptions";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import RelativeTime from "../../../shared/RelativeTime";
import { useFullPath } from "../../../utils/router";

function Show() {
  const { fullPath } = useFullPath();
  const { data, loading, error } = useProjectQuery({
    variables: { fullPath },
  });

  const project = data?.project;
  const policy = data?.projectPolicy;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!project || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ChunkPaper primary="项目概览">
      <Descriptions>
        <Item label="ID">{project.id}</Item>
        <Item label="名称">{project.fullName}</Item>
        <Item label="路径">{project.fullPath}</Item>
        <Item label="描述">{project.description}</Item>
        <Item label="可见性">{project.visibility}</Item>
        <Item label="创建时间">
          <RelativeTime date={project.createdAt} />
        </Item>
        <Item label="更新时间">
          <RelativeTime date={project.updatedAt} />
        </Item>
      </Descriptions>
    </ChunkPaper>
  );
}

export default Show;
