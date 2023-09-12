import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import {
  Action,
  DeleteMemberInput,
  Member,
  Policy,
} from "../../generated/types";
import { ge } from "../../utils/access";

interface Props {
  policy: Policy;
  member: Member;
  onDelete: (input: DeleteMemberInput) => void;
}

function TableCellDelete(props: Props & TableCellProps) {
  const {
    policy: { access, actions },
    member,
    onDelete,
    ...tableCellProps
  } = props;

  const onClick = () => {
    onDelete({ id: member.id });
  };

  return (
    <TableCell {...tableCellProps}>
      <IconButton
        disabled={
          !actions.includes(Action.DeleteMember) || !ge(access, member.access)
        }
        title="删除成员"
        onClick={onClick}
      >
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
}

export default TableCellDelete;
