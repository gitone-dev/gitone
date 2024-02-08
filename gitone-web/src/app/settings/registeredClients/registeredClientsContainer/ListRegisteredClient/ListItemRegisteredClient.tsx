import { RegisteredClient } from "@/generated/types";
import RelativeTime from "@/shared/RelativeTime";
import { fromGlobalId } from "@/utils/relay";
import KeyIcon from "@mui/icons-material/Key";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  fullPath: string;
  registeredClient: RegisteredClient;
}

export default function ListItemRegisteredClient(props: Props) {
  const { registeredClient } = props;

  return (
    <ListItem divider>
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
          <Link
            component={RouterLink}
            to={`${fromGlobalId(registeredClient.id).id}`}
            color="inherit"
            underline="hover"
          >
            {registeredClient.clientName}
          </Link>
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" color="text.secondary" variant="body2">
            <RelativeTime date={registeredClient.createdAt} />
            添加到{" "}
            <Link
              component={RouterLink}
              to={`/${registeredClient.namespace?.fullPath}`}
              color="inherit"
              underline="hover"
            >
              {registeredClient.namespace?.fullName}
            </Link>
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
