import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  icon?: React.ReactNode;
  hidden?: boolean;
}

function ListItemLink(props: Props) {
  const { to, text, icon, hidden } = props;
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
