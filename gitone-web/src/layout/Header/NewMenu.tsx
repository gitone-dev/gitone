import AddBoxIcon from "@mui/icons-material/AddBox";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function NewMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={onOpen}>
        <AddBoxIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem component={RouterLink} to="/groups/new">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText>新建组织</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default NewMenu;
