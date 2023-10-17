import { useUserDetailQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import Descriptions, { Item } from "../../../shared/Descriptions";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import RelativeTime from "../../../shared/RelativeTime";
import { useFullPath } from "../../../utils/router";

function Show() {
  const { fullPath: username } = useFullPath();
  const { data, loading, error } = useUserDetailQuery({
    variables: { username },
  });

  const user = data?.user;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!user) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ChunkPaper primary="用户概览">
      <Descriptions>
        <Item label="ID">{user.id}</Item>
        <Item label="昵称">{user.name}</Item>
        <Item label="用户名">{user.username}</Item>
        <Item label="自我介绍">{user.description}</Item>
        <Item label="创建时间">
          <RelativeTime date={user.createdAt} />
        </Item>
      </Descriptions>
    </ChunkPaper>
  );
}

export default Show;
