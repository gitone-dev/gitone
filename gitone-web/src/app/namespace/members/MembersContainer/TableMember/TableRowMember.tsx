import {
  DeleteMemberInput,
  Member,
  Policy,
  UpdateMemberInput,
} from "@/generated/types";
import TableRow from "@mui/material/TableRow";
import TableCellAccess from "./TableCellAccess";
import TableCellCreatedAt from "./TableCellCreatedAt";
import TableCellDelete from "./TableCellDelete";
import TableCellNamespace from "./TableCellNamespace";
import TableCellUser from "./TableCellUser";

interface Props {
  fullPath: string;
  policy: Policy;
  member: Member;
  onUpdate: (input: UpdateMemberInput) => void;
  onDelete: (input: DeleteMemberInput) => void;
}

function TableRowMember(props: Props) {
  const { fullPath, policy, member, onUpdate, onDelete } = props;

  return (
    <TableRow>
      <TableCellUser user={member.user} />
      <TableCellNamespace fullPath={fullPath} namespace={member.namespace} />
      <TableCellAccess
        fullPath={fullPath}
        policy={policy}
        member={member}
        onUpdate={onUpdate}
      />
      <TableCellCreatedAt member={member} />
      <TableCellDelete policy={policy} member={member} onDelete={onDelete} />
    </TableRow>
  );
}

export default TableRowMember;
