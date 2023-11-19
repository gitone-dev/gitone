import {
  DeleteMemberInput,
  MemberEdge,
  PageInfo,
  Policy,
  UpdateMemberInput,
} from "@/generated/types";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableRowMember from "./TableRowMember";

interface Props {
  fullPath: string;
  policy: Policy;
  edges: Array<MemberEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
  onUpdate: (input: UpdateMemberInput) => void;
  onDelete: (input: DeleteMemberInput) => void;
}

function TableMember(props: Props) {
  const { fullPath, policy, edges, pageInfo, loadMore, onUpdate, onDelete } =
    props;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>成员</TableCell>
            <TableCell>来源</TableCell>
            <TableCell>最大权限</TableCell>
            <TableCell>加入时间</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {edges.map((edge) => (
            <TableRowMember
              key={edge.cursor}
              fullPath={fullPath}
              policy={policy}
              member={edge.node}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        fullWidth
        variant="text"
        color="primary"
        onClick={loadMore}
        sx={{ textAlign: "center" }}
        disabled={!pageInfo.hasNextPage}
      >
        {pageInfo.hasNextPage ? "加载更多" : "没有更多了"}
      </Button>
    </TableContainer>
  );
}

export default TableMember;
