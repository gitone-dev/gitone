import {
  DeleteTagInput,
  PageInfo,
  Policy,
  TagEdge,
} from "@/generated/types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemTag from "./ListItemTag";

interface Props {
  fullPath: string;
  policy: Policy;
  edges: Array<TagEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
  onDelete: (input: DeleteTagInput) => void;
}

export default function ListTag(props: Props) {
  const { fullPath, policy, edges, pageInfo, loadMore, onDelete } = props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemTag
          fullPath={fullPath}
          key={edge.cursor}
          policy={policy}
          tag={edge.node}
          onDelete={onDelete}
        />
      ))}
      <ListItemButton disabled={!pageInfo.hasNextPage} onClick={loadMore}>
        <ListItemText inset sx={{ textAlign: "center" }}>
          {pageInfo.hasNextPage ? "加载更多" : "没有更多了"}
        </ListItemText>
      </ListItemButton>
    </List>
  );
}
