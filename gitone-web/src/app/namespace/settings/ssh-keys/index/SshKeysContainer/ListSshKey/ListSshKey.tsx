import {
  DeleteSshKeyInput,
  PageInfo,
  Policy,
  SshKeyEdge,
  UpdateSshKeyInput,
} from "@/generated/types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemSshKey from "./ListItemSshKey";

interface Props {
  fullPath: string;
  policy: Policy;
  edges: Array<SshKeyEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
  onUpdate: (input: UpdateSshKeyInput) => void;
  onDelete: (input: DeleteSshKeyInput) => void;
}

export default function ListSshKey(props: Props) {
  const { fullPath, policy, edges, pageInfo, loadMore, onUpdate, onDelete } =
    props;

  return (
    <List>
      {edges.map((edge) => (
        <ListItemSshKey
          fullPath={fullPath}
          key={edge.cursor}
          policy={policy}
          sshKey={edge.node}
          onUpdate={onUpdate}
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
