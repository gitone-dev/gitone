import { Action, DeleteTagInput, Policy, Tag } from "@/generated/types";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  fullPath: string;
  policy: Policy;
  tag: Tag;
  onDelete: (input: DeleteTagInput) => void;
}

export default function TagMenu(props: Props) {
  const {
    fullPath,
    policy: { actions },
    tag,
    onDelete,
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const name = tag.name;

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onClickDelete = () => {
    onDelete({ fullPath, name });
  };

  return (
    <>
      <IconButton title="操作" onClick={onClick}>
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
        slotProps={{ paper: { sx: { width: 160 } } }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          divider
          title="浏览文件"
          component={RouterLink}
          to={`/${fullPath}/-/tree/${name}`}
        >
          <ListItemIcon>
            <FolderOutlinedIcon />
          </ListItemIcon>
          <ListItemText>浏览文件</ListItemText>
        </MenuItem>
        <MenuItem
          title="下载 .zip"
          component={Link}
          href={`/${fullPath}/-/archive/${name}.zip`}
        >
          <ListItemIcon>
            <FolderZipIcon />
          </ListItemIcon>
          <ListItemText>下载 .zip</ListItemText>
        </MenuItem>
        <MenuItem
          divider
          title="下载 .tar.gz"
          component={Link}
          href={`/${fullPath}/-/archive/${name}.tar.gz`}
        >
          <ListItemIcon>
            <FolderZipIcon />
          </ListItemIcon>
          <ListItemText>下载 .tar.gz</ListItemText>
        </MenuItem>
        {tag.isRelease ? (
          <MenuItem
            title="编辑发行版"
            disabled={!actions.includes(Action.Update)}
            component={RouterLink}
            to={`/${fullPath}/-/releases/edit/${name}`}
            state={tag}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>编辑发布</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem
            title="创建发行版"
            disabled={!actions.includes(Action.Update)}
            component={RouterLink}
            to={`/${fullPath}/-/releases/new`}
            state={tag}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>新建发布</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          title="删除标签"
          disabled={!actions.includes(Action.Update) || !!tag.isRelease}
          onClick={onClickDelete}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>删除标签</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
