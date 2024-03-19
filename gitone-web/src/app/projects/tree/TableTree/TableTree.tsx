import { PageInfo, TreeEntryEdge } from "@/generated/types";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableRowEntry from "./TableRowEntry";

interface Props {
  fullPath: string;
  revision: string;
  edges: Array<TreeEntryEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
}

export default function TableTree(props: Props) {
  const { fullPath, revision, edges, pageInfo, loadMore } = props;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell key="1"></TableCell>
            <TableCell key="2">文件</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {edges.map((edge) => (
            <TableRowEntry
              key={edge.node.id}
              fullPath={fullPath}
              revision={revision}
              entry={edge.node}
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
