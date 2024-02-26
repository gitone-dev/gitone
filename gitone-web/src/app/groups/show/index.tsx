import { Action, useGroupQuery, useViewerQuery } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import Descriptions, { Item } from "@/shared/Descriptions";
import ErrorBox from "@/shared/ErrorBox";
import GroupsContainer, { Header, useSearch } from "@/shared/GroupsContainer";
import LoadingBox from "@/shared/LoadingBox";
import RelativeTime from "@/shared/RelativeTime";
import { useFullPath } from "@/utils/router";

export default function Show() {
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
    <>
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
      <ChunkPaper primary="组织列表">
        <Header
          isLoggedIn={isLoggedIn}
          canCreate={policy.actions.includes(Action.Update)}
          group={group}
        />
        <GroupsContainer
          parentId={group.id}
          query={query}
          visibility={visibility}
          orderField={orderField}
        />
      </ChunkPaper>
    </>
  );
}
