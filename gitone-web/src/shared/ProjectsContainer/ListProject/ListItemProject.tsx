import { Project } from "@/generated/types";
import RelativeTime from "@/shared/RelativeTime";
import VisibilityIcon from "@/shared/VisibilityIcon";
import GroupIcon from "@mui/icons-material/Group";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  project: Project;
}

function ListItemProject(props: Props) {
  const { project } = props;

  const projectPath = `/${project.fullPath}`;

  return (
    <ListItem divider>
      <ListItemIcon>
        <Avatar
          component={RouterLink}
          to={projectPath}
          src={project.avatarUrl || ""}
        >
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
              to={projectPath}
            >
              {project.fullName}
            </Link>
            <VisibilityIcon visibility={project.visibility} />
          </>
        }
        secondary={project.description}
      />
      <ListItemText
        sx={{ flexGrow: 0, paddingLeft: 1, width: 100, minWidth: 100 }}
        secondary={<RelativeTime date={project.createdAt} />}
      />
    </ListItem>
  );
}

export default ListItemProject;
