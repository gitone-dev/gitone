import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface Props {
  icon?: React.ReactNode;
  text: string;
  to: string;
  hidden?: boolean;
}

function ListItemLink(props: Props) {
  const { icon, text, to, hidden } = props;
  const { pathname } = useLocation();

  if (hidden) return <></>;
  return (
    <ListItemButton component={RouterLink} to={to} selected={pathname === to}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

export default ListItemLink;
export type { Props as Item };
