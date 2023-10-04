import TableRow from "@mui/material/TableRow";
import {
  DeleteMemberInput,
  Member,
  Policy,
  UpdateMemberInput,
} from "../../generated/types";
import TableCellAccess from "./TableCellAccess";
import TableCellCreatedAt from "./TableCellCreatedAt";
import TableCellDelete from "./TableCellDelete";
import TableCellUser from "./TableCellUser";
import TableCellNamespace from "./TableCellNamespace";

interface Props {
  namespaceId: string;
  policy: Policy;
  member: Member;
  onUpdate: (input: UpdateMemberInput) => void;
  onDelete: (input: DeleteMemberInput) => void;
}

function TableRowMember(props: Props) {
  const { namespaceId, policy, member, onUpdate, onDelete } = props;

  return (
    <TableRow>
      <TableCellUser user={member.user} />
      <TableCellNamespace
        namespaceId={namespaceId}
        namespace={member.namespace}
      />
      <TableCellAccess
        namespaceId={namespaceId}
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
