import { PageInfo, ProjectEdge } from "@/generated/types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemProject from "./ListItemProject";

interface Props {
  edges: Array<ProjectEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
}

function ListProject(props: Props) {
  const { edges, pageInfo, loadMore } = props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemProject key={edge.cursor} project={edge.node} />
      ))}
      <ListItemButton disabled={!pageInfo.hasNextPage} onClick={loadMore}>
        <ListItemText inset sx={{ textAlign: "center" }}>
          {pageInfo.hasNextPage ? "加载更多" : "没有更多了"}
        </ListItemText>
      </ListItemButton>
    </List>
  );
}

export default ListProject;
