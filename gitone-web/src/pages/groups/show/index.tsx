import { useGroupQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import Descriptions, { Item } from "../../../shared/Descriptions";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import RelativeTime from "../../../shared/RelativeTime";
import { useFullPath } from "../../../utils/router";

function Show() {
  const fullPath = useFullPath();
  const { data, loading, error } = useGroupQuery({
    variables: { fullPath },
  });

  const group = data?.group;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!group) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ChunkPaper primary="组织概览">
      <Descriptions>
        <Item label="ID">{group.id}</Item>
        <Item label="名称">{group.fullName}</Item>
        <Item label="路径">{group.fullPath}</Item>
        <Item label="描述">{group.description}</Item>
        <Item label="可见性">{group.visibility}</Item>
        <Item label="创建时间">
          <RelativeTime date={group.createdAt} />
        </Item>
        <Item label="更新时间">
          <RelativeTime date={group.updatedAt} />
        </Item>
      </Descriptions>
    </ChunkPaper>
  );
}

export default Show;
