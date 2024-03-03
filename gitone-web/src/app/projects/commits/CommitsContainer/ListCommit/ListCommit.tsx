import { CommitEdge, PageInfo, RevisionPath } from "@/generated/types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemCommit from "./ListItemCommit";

interface Props {
  fullPath: string;
  revisionPath: RevisionPath;
  edges: Array<CommitEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
}

export default function ListCommit(props: Props) {
  const { fullPath, revisionPath, edges, pageInfo, loadMore } = props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemCommit
          fullPath={fullPath}
          revisionPath={revisionPath}
          key={edge.cursor}
          commit={edge.node}
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
