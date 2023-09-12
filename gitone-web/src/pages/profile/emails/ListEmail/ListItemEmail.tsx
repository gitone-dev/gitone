import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { DeleteEmailInput, Email } from "../../../../generated/types";

interface Props {
  email: Email;
  onDelete: (input: DeleteEmailInput) => void;
}

function ListItemEmail(props: Props) {
  const { email, onDelete } = props;

  const onDeleteEmail = () => {
    onDelete({ email: email.email });
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <IconButton edge="end" disabled={email.primary} onClick={onDeleteEmail}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Box>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body1"
          color="texxt.primary"
        >
          {email.email}
        </Typography>
        <Box component="ul">
          {email.primary && (
            <>
              <Typography component="li" color="text.secondary" variant="body2">
                主邮箱
              </Typography>
              <Typography component="li" color="text.secondary" variant="body2">
                通知邮箱
              </Typography>
            </>
          )}
          <Typography component="li" color="text.secondary" variant="body2">
            已激活
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}

export default ListItemEmail;
