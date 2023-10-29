import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ListItemText, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import {
  Action,
  DeleteSshKeyInput,
  Policy,
  SshKey,
  UpdateSshKeyInput,
} from "../../../../../../generated/types";
import EditDialog from "./EditDialog";

interface Props {
  fullPath: string;
  policy: Policy;
  sshKey: SshKey;
  onUpdate: (input: UpdateSshKeyInput) => void;
  onDelete: (input: DeleteSshKeyInput) => void;
}

function SshKeyMenu(props: Props) {
  const {
    policy: { actions },
    sshKey,
    onUpdate,
    onDelete,
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onClickDelete = () => {
    onDelete({ id: sshKey.id });
  };

  const onOpenDialog = () => {
    onClose();
    setOpenDialog(true);
  };

  const onCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <IconButton
        disabled={!actions.includes(Action.Update)}
        title="删除公钥"
        onClick={onClick}
      >
        <MoreVertIcon />
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
        slotProps={{ paper: { sx: { width: 120 } } }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={onOpenDialog}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>编辑</ListItemText>
        </MenuItem>
        <MenuItem onClick={onClickDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>删除</ListItemText>
        </MenuItem>
      </Menu>
      <EditDialog
        sshKey={sshKey}
        open={openDialog}
        onClose={onCloseDialog}
        onUpdate={onUpdate}
      />
    </>
  );
}

export default SshKeyMenu;
