import { Maybe } from "@/generated/types";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import TableCell from "@mui/material/TableCell";

interface Props {
  type?: Maybe<string>;
}

function TableCellIcon(props: Props) {
  const { type } = props;
  let icon = <InsertDriveFileOutlinedIcon />;
  if (type === "commit") {
    icon = <SnippetFolderIcon />;
  } else if (type === "tree") {
    icon = <FolderIcon />;
  }

  return <TableCell sx={{ width: 24, pr: 0 }}>{icon}</TableCell>;
}

export default TableCellIcon;
