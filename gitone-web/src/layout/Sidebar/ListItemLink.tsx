import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  key?: string;
  icon?: React.ReactNode;
  text: string;
  to: string;
  hidden?: boolean;
  selected: boolean;
  children?: Array<SubProps>;
}

interface SubProps {
  key?: string;
  icon?: React.ReactNode;
  text: string;
  to: string;
  hidden?: boolean;
  selected: boolean;
}

export default function ListItemLink(props: Props) {
  const { icon, text, to, hidden, selected, children } = props;
  const [open, setOpen] = useState<boolean>(
    !!children?.find((e) => e.selected)
  );

  const onClick = () => setOpen(!open);

  if (hidden) return <></>;

  if (!children) {
    return (
      <ListItemButton component={RouterLink} to={to} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </ListItemButton>
    );
  }

  return (
    <>
      <ListItemButton onClick={onClick}>
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
              selected={item.selected}
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

export type { Props as Item };
