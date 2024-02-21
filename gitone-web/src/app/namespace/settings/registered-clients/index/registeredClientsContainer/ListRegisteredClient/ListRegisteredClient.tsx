import { PageInfo, RegisteredClientEdge } from "@/generated/types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemRegisteredClient from "./ListItemRegisteredClient";

interface Props {
  fullPath: string;
  edges: Array<RegisteredClientEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
}

export default function ListRegisteredClient(props: Props) {
  const { fullPath, edges, pageInfo, loadMore } = props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemRegisteredClient
          fullPath={fullPath}
          key={edge.cursor}
          registeredClient={edge.node}
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
