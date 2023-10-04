import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { cache } from "../../../client";
import {
  Action,
  ViewerDocument,
  ViewerQuery,
  useGroupQuery,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import Descriptions, { Item } from "../../../shared/Descriptions";
import ErrorBox from "../../../shared/ErrorBox";
import GroupsContainer, {
  Header,
  useSearch,
} from "../../../shared/GroupsContainer";
import LoadingBox from "../../../shared/LoadingBox";
import RelativeTime from "../../../shared/RelativeTime";
import { useFullPath } from "../../../utils/router";

function Show() {
  const { fullPath } = useFullPath();
  const viewer = cache.readQuery<ViewerQuery>({ query: ViewerDocument });
  const isViewer = Boolean(viewer);
  const { query, visibility, orderField } = useSearch({ isViewer });
  const { data, loading, error } = useGroupQuery({
    variables: { fullPath },
  });

  const group = data?.group;
  const policy = data?.groupPolicy;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!group || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <ChunkPaper
        primary="组织概览"
        action={
          <Button
            disabled={!policy.actions.includes(Action.Update)}
            variant="contained"
            component={RouterLink}
            to={`/groups/new`}
            state={group}
          >
            创建子组
          </Button>
        }
      >
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
        <Header isViewer={isViewer} />
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

export default Show;