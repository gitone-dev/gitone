import { RevisionPath } from "@/generated/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ListBranchName } from "./ListBranchName";
import { ListTagName } from "./ListTagName";

interface Props {
  fullPath: string;
  type: "blob" | "tree" | "commits";
  revisionPath: RevisionPath;
}

function RefSwitcher(props: Props) {
  const {
    fullPath,
    type,
    revisionPath: { revision, path },
  } = props;
  const [value, setValue] = useState("branches");
  const [query, setQuery] = useState<string | null>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onChange = (_: React.SyntheticEvent, value: string) => {
    setValue(value);
  };

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup size="small">
        <Button onClick={onClick} title="版本切换" size="small">
          <ExpandMoreIcon />
        </Button>
        <Button
          size="small"
          component={RouterLink}
          sx={{ textTransform: "none" }}
          to={`/${fullPath}/-/${
            type === "commits" ? "commits" : "tree"
          }/${revision}`}
        >
          <code>{revision}</code>
        </Button>
      </ButtonGroup>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={onClose}>
          <Paper sx={{ pt: 2, px: 2, width: 300 }}>
            <TextField
              fullWidth
              autoFocus
              sx={{ flexGrow: 1 }}
              size="small"
              placeholder="分支名或标签名"
              defaultValue={query}
              onChange={onChangeQuery}
              name="query"
            />
            <TabContext value={value}>
              <TabList onChange={onChange}>
                <Tab label="分支" value="branches" />
                <Tab label="标签" value="tags" />
              </TabList>
              <TabPanel value="branches" sx={{ p: 0, m: 0 }}>
                <ListBranchName
                  fullPath={fullPath}
                  revision={revision}
                  type={type}
                  path={path}
                  query={query}
                />
              </TabPanel>
              <TabPanel value="tags" sx={{ p: 0, m: 0 }}>
                <ListTagName
                  fullPath={fullPath}
                  revision={revision}
                  type={type}
                  path={path}
                  query={query}
                />
              </TabPanel>
            </TabContext>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

export default RefSwitcher;
