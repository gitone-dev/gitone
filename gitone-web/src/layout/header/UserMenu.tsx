import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { deleteSession } from "../../client";
import { User, useDeleteSessionMutation } from "../../generated/types";

interface Props {
  viewer: User;
}

function UserMenu(props: Props) {
  const { viewer } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteSessionMutation] = useDeleteSessionMutation();

  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onDeleteSession = () => {
    deleteSession();
    deleteSessionMutation({
      onCompleted() {
        window.location.href = "/session/new";
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  return (
    <>
      <IconButton color="inherit" onClick={onOpen}>
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
        slotProps={{ paper: { sx: { width: 200 } } }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem component={RouterLink} to={`/${viewer.username}`} divider>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>@{viewer.username}</ListItemText>
        </MenuItem>
        <MenuItem component={RouterLink} to="/profile" divider>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>设置</ListItemText>
        </MenuItem>
        <MenuItem onClick={onDeleteSession}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>退出</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
