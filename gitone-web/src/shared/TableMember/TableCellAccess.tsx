import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import {
  Access,
  Action,
  Member,
  Policy,
  UpdateMemberInput,
} from "../../generated/types";
import { ge } from "../../utils/access";

interface Props {
  policy: Policy;
  member: Member;
  onUpdate: (input: UpdateMemberInput) => void;
}

function TableCellAccess(props: Props & TableCellProps) {
  const {
    policy: { access, actions },
    member,
    onUpdate,
    ...tableCellProps
  } = props;

  const onChange = (event: SelectChangeEvent<Access>) => {
    onUpdate({ id: member.id, access: event.target.value as Access });
  };

  return (
    <TableCell {...tableCellProps}>
      <Select
        disabled={
          !actions.includes(Action.UpdateMember) || !ge(access, member.access)
        }
        onChange={onChange}
        size="small"
        value={member.access || Access.NoAccess}
      >
        <MenuItem value={Access.Owner} disabled={!ge(access, Access.Owner)}>
          所有者
        </MenuItem>
        <MenuItem value={Access.Maintainer}>维护者</MenuItem>
        <MenuItem value={Access.Reporter}>报告者</MenuItem>
      </Select>
    </TableCell>
  );
}

export default TableCellAccess;
