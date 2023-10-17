import GroupIcon from "@mui/icons-material/Group";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { Group } from "../../../generated/types";
import RelativeTime from "../../RelativeTime";
import VisibilityIcon from "../../VisibilityIcon";

interface Props {
  group: Group;
}

function ListItemGroup(props: Props) {
  const { group } = props;

  const groupPath = `/${group.fullPath}`;

  return (
    <ListItem divider>
      <ListItemIcon>
        <Avatar component={RouterLink} to={groupPath}>
          <GroupIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={groupPath}
            >
              {group.fullName}
            </Link>
            <VisibilityIcon visibility={group.visibility} />
          </>
        }
        secondary={group.description}
      />
      <ListItemText
        sx={{ flexGrow: 0, paddingLeft: 1, width: 100, minWidth: 100 }}
        secondary={<RelativeTime date={group.createdAt} />}
      />
    </ListItem>
  );
}

export default ListItemGroup;
