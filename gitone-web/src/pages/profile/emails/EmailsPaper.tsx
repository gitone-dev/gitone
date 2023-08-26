import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import {
  CreateEmailInput,
  DeleteEmailInput,
  EmailConnection,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";

interface Props {
  emails: EmailConnection;
  unconfirmedEmails: EmailConnection;
  onCreate: (input: CreateEmailInput) => void;
  onDelete: (input: DeleteEmailInput) => void;
}

function EmailsPaper(props: Props) {
  const { emails, unconfirmedEmails, onCreate, onDelete } = props;

  const onCreateEmail = (email: string) => {
    return () => onCreate({ email });
  };

  const onDeleteEmail = (email: string) => {
    return () => onDelete({ email });
  };

  return (
    <ChunkPaper primary="邮箱列表">
      <List sx={{ p: 0 }}>
        {emails.edges?.map((edge) => (
          <ListItem
            divider
            key={edge.cursor}
            secondaryAction={
              <IconButton
                edge="end"
                disabled={edge.node.primary}
                onClick={onDeleteEmail(edge.node.email)}
              >
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
                {edge.node.email}
              </Typography>
              <Box component="ul">
                {edge.node.primary && (
                  <>
                    <Typography
                      component="li"
                      color="text.secondary"
                      variant="body2"
                    >
                      主邮箱
                    </Typography>
                    <Typography
                      component="li"
                      color="text.secondary"
                      variant="body2"
                    >
                      通知邮箱
                    </Typography>
                  </>
                )}
                <Typography
                  component="li"
                  color="text.secondary"
                  variant="body2"
                >
                  已激活
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
        {unconfirmedEmails.edges?.map((edge) => (
          <ListItem
            divider
            key={edge.cursor}
            secondaryAction={
              <IconButton edge="end" onClick={onDeleteEmail(edge.node.email)}>
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
                {edge.node.email}
              </Typography>
              <Box component="ul">
                <Typography
                  component="li"
                  color="text.secondary"
                  variant="body2"
                >
                  未激活
                  <Button onClick={onCreateEmail(edge.node.email)}>
                    重发激活邮件
                  </Button>
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </ChunkPaper>
  );
}

export default EmailsPaper;
