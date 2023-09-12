import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { GroupEdge, PageInfo } from "../../generated/types";
import ListItemGroup from "./ListItemGroup";

interface Props {
  edges: Array<GroupEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
}

function ListGroup(props: Props) {
  const { edges, pageInfo, loadMore } = props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemGroup key={edge.cursor} group={edge.node} />
      ))}
      <ListItemButton disabled={!pageInfo.hasNextPage} onClick={loadMore}>
        <ListItemText inset sx={{ textAlign: "center" }}>
          {pageInfo.hasNextPage ? "加载更多" : "没有更多了"}
        </ListItemText>
      </ListItemButton>
    </List>
  );
}

export default ListGroup;
