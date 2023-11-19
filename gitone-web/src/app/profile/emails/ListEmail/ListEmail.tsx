import {
  CreateEmailInput,
  DeleteEmailInput,
  EmailConnection,
} from "@/generated/types";
import List from "@mui/material/List";
import ListItemEmail from "./ListItemEmail";
import ListItemUnconfirmedEmail from "./ListUnconfirmedEmail";

interface Props {
  emails: EmailConnection;
  unconfirmedEmails: EmailConnection;
  onCreate: (input: CreateEmailInput) => void;
  onDelete: (input: DeleteEmailInput) => void;
}

function ListEmail(props: Props) {
  const { emails, unconfirmedEmails, onCreate, onDelete } = props;

  return (
    <List sx={{ p: 0 }}>
      {emails.edges?.map((edge) => (
        <ListItemEmail
          key={edge.cursor}
          email={edge.node}
          onDelete={onDelete}
        />
      ))}
      {unconfirmedEmails.edges?.map((edge) => (
        <ListItemUnconfirmedEmail
          key={edge.cursor}
          email={edge.node}
          onCreate={onCreate}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}

export default ListEmail;
