import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {
  CreateEmailInput,
  DeleteEmailInput,
  Email,
} from "../../../../generated/types";

interface Props {
  email: Email;
  onCreate: (input: CreateEmailInput) => void;
  onDelete: (input: DeleteEmailInput) => void;
}

function ListItemUnconfirmedEmail(props: Props) {
  const { email, onCreate, onDelete } = props;

  const onDeleteEmail = () => {
    onDelete({ email: email.email });
  };

  const onCreateEmail = () => {
    onCreate({ email: email.email });
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton edge="end" title="删除邮箱" onClick={onDeleteEmail}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <Box>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body1"
          color="texxt.primary"
        >
          {email.email}
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" color="text.secondary" variant="body2">
            未激活
            <Button onClick={onCreateEmail}>重发激活邮件</Button>
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}

export default ListItemUnconfirmedEmail;
