import { TreeEntry } from "@/generated/types";
import Link from "@mui/material/Link";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import TableCellIcon from "./TableCellIcon";

interface Props {
  fullPath: string;
  revision: string;
  entry: TreeEntry;
}

function TableRowEntry(props: Props) {
  const { fullPath, revision, entry } = props;

  return (
    <TableRow hover>
      <TableCellIcon type={entry.type} />
      <TableCell sx={{ pl: 1 }}>
        {entry.type === "commit" ? (
          <span>{entry.name}</span>
        ) : (
          <Link
            color="inherit"
            component={RouterLink}
            to={`/${fullPath}/-/${entry.type}/${revision}/${entry.path}`}
            underline="hover"
          >
            {entry.name}
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
}

export default TableRowEntry;
