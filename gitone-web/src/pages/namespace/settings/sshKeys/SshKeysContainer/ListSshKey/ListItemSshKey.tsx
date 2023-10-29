import KeyIcon from "@mui/icons-material/Key";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import {
  Action,
  DeleteSshKeyInput,
  Policy,
  SshKey,
  SshKeyUsage,
  UpdateSshKeyInput,
} from "../../../../../../generated/types";
import LocalTime from "../../../../../../shared/LocalTime";
import RelativeTime from "../../../../../../shared/RelativeTime";
import SshKeyMenu from "./SshKeyMenu";

interface Props {
  fullPath: string;
  policy: Policy;
  sshKey: SshKey;
  onUpdate: (input: UpdateSshKeyInput) => void;
  onDelete: (input: DeleteSshKeyInput) => void;
}

function ListItemSshKey(props: Props) {
  const {
    policy: { actions },
    sshKey,
  } = props;

  return (
    <ListItem
      divider
      secondaryAction={
        actions.includes(Action.Update) && <SshKeyMenu {...props} />
      }
    >
      <ListItemIcon>
        <KeyIcon />
      </ListItemIcon>
      <Box>
        <Typography
          color="text.primary"
          component="span"
          sx={{ display: "inline" }}
          variant="body1"
        >
          {sshKey.title}
          {sshKey.isExpired ? (
            <Chip color="warning" label="过期" sx={{ ml: 1 }} size="small" />
          ) : (
            <Chip color="success" label="有效" sx={{ ml: 1 }} size="small" />
          )}
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" color="text.secondary" variant="body2">
            <code>{sshKey.fingerprint}</code>
          </Typography>
          <Typography component="li" color="text.secondary" variant="body2">
            <RelativeTime date={sshKey.createdAt} />
            添加到{" "}
            <Link
              component={RouterLink}
              to={`/${sshKey.namespace?.fullPath}`}
              color="inherit"
              underline="hover"
            >
              {sshKey.namespace?.fullName}
            </Link>
          </Typography>
          <Typography component="li" color="text.secondary" variant="body2">
            <>
              {sshKey.expiresAt ? (
                <LocalTime date={sshKey.expiresAt} suffix="前" />
              ) : (
                "长期"
              )}
              可用于
              {sshKey.usages?.includes(SshKeyUsage.Read) && <span>读</span>}
              {sshKey.usages?.includes(SshKeyUsage.Write) && <span>写</span>}
            </>
            {sshKey.lastUsedAt !== null && (
              <>
                {" ── "}
                最近一次使用 <RelativeTime date={sshKey.lastUsedAt} />
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}

export default ListItemSshKey;
