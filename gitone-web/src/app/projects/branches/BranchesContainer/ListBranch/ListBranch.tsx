import {
  BranchEdge,
  DeleteBranchInput,
  PageInfo,
  Policy,
} from "@/generated/types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemBranch from "./ListItemBranch";

interface Props {
  fullPath: string;
  policy: Policy;
  edges: Array<BranchEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
  onDelete: (input: DeleteBranchInput) => void;
}

function ListBranch(props: Props) {
  const { fullPath, policy, edges, pageInfo, loadMore, onDelete } = props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemBranch
          fullPath={fullPath}
          key={edge.cursor}
          policy={policy}
          branch={edge.node}
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

export default ListBranch;
