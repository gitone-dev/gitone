import { Member } from "@/generated/types";
import RelativeTime from "@/shared/RelativeTime";
import TableCell, { TableCellProps } from "@mui/material/TableCell";

interface Props {
  member: Member;
}

function TableCellCreatedAt(props: Props & TableCellProps) {
  const { member, ...tableCellProps } = props;

  return (
    <TableCell {...tableCellProps}>
      <RelativeTime date={member.createdAt} />
    </TableCell>
  );
}

export default TableCellCreatedAt;
