import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  icon?: React.ReactNode;
  pl?: number;
}

function ListItemLink(props: Props) {
  const { to, text, icon } = props;
  const { pathname } = useLocation();

  return (
    <ListItem disablePadding>
      <ListItemButton component={RouterLink} to={to} selected={pathname === to}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListItemLink;
