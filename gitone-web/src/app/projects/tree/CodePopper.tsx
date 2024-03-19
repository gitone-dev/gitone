import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { useState } from "react";

interface Props {
  fullPath: string;
  revision: string;
}

export default function CodePopper(props: Props) {
  const { fullPath, revision } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        size="small"
        endIcon={<ExpandMoreIcon />}
        variant="contained"
        onClick={onClick}
      >
        Code
      </Button>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-end"
        sx={{ zIndex: 100 }}
      >
        <ClickAwayListener onClickAway={onClose}>
          <Paper sx={{ pt: 2, width: 200 }}>
            <List dense>
              <ListItem disablePadding>
                <ListItemButton href={`/${fullPath}/-/archive/${revision}.zip`}>
                  <ListItemIcon>
                    <FolderZipIcon />
                  </ListItemIcon>
                  <ListItemText>下载 .zip</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  href={`/${fullPath}/-/archive/${revision}.tar.gz`}
                >
                  <ListItemIcon>
                    <FolderZipIcon />
                  </ListItemIcon>
                  <ListItemText>下载 .tar.gz</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
