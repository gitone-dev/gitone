import {
  DeleteReleaseInput,
  PageInfo,
  Policy,
  ReleaseEdge,
} from "@/generated/types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemRelease from "./ListItemRelease";

interface Props {
  fullPath: string;
  policy: Policy;
  edges: Array<ReleaseEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
  onDelete: (input: DeleteReleaseInput) => void;
}

export default function ListRelease(props: Props) {
  const { fullPath, policy, edges, pageInfo, loadMore, onDelete } = props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemRelease
          fullPath={fullPath}
          key={edge.cursor}
          policy={policy}
          release={edge.node}
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
