import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface Props {
  key?: string;
  icon?: React.ReactNode;
  text: string;
  to: string;
  hidden?: boolean;
  children?: Array<SubProps>;
}

interface SubProps {
  key?: string;
  icon?: React.ReactNode;
  text: string;
  to: string;
  hidden?: boolean;
}

function ListItemLink(props: Props) {
  const { icon, text, to, hidden, children } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState<boolean>(
    !!(children && (to === pathname || children.find((e) => e.to === pathname)))
  );

  const onClick = () => setOpen(!open);

  if (hidden) return <></>;
  if (!children) {
    return (
      <ListItemButton component={RouterLink} to={to} selected={pathname === to}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </ListItemButton>
    );
  }

  return (
    <>
      <ListItemButton selected={pathname === to} onClick={onClick}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {children.map((item) => (
            <ListItemButton
              sx={{ pl: 9 }}
              key={item.key}
              component={RouterLink}
              to={item.to}
              selected={pathname === item.to}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default ListItemLink;
export type { Props as Item };
