import CodeIcon from "@mui/icons-material/Code";
import CommitIcon from "@mui/icons-material/Commit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import { Commit, Policy, RevisionPath } from "../../../../../generated/types";
import CommitTip from "../../../../../shared/CommitTip";
import RelativeTime from "../../../../../shared/RelativeTime";
import { SHA_ABBR_LENGTH } from "../../../../../utils/git";

interface Props {
  fullPath: string;
  revisionPath: RevisionPath;
  policy: Policy;
  commit: Commit;
}

function ListItemCommit(props: Props) {
  const {
    fullPath,
    revisionPath: { type, path },
    commit,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onClick = () => {
    copy(commit.sha);
    enqueueSnackbar(`已复制：${commit.sha}`, { variant: "info" });
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <ButtonGroup size="small">
          <Button size="small" onClick={onClick} title="复制完整的 Commit SHA">
            <ContentCopyIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            title="查看提交"
            component={RouterLink}
            to={`/${fullPath}/-/commit/${commit?.sha}`}
            sx={{ textTransform: "none" }}
          >
            <code>{commit?.sha.substring(0, SHA_ABBR_LENGTH)}</code>
          </Button>
          {path && (
            <Button
              size="small"
              title="查看当前版本文件"
              component={RouterLink}
              to={`/${fullPath}/-/${type}/${commit.sha}/${path}`}
            >
              <DeveloperModeIcon fontSize="small" />
            </Button>
          )}
          <Button
            size="small"
            title="查看当前版本仓库"
            component={RouterLink}
            to={`/${fullPath}/-/tree/${commit.sha}`}
          >
            <CodeIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      }
    >
      <ListItemIcon>
        <CommitIcon />
      </ListItemIcon>
      <ListItemText>
        <CommitTip
          fullPath={fullPath}
          commit={commit}
          color="text.primary"
          variant="body1"
        />
        <Stack direction="row" spacing={1}>
          <Typography color="text.secondary" variant="body2">
            {commit?.committer?.name} 提交于
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <RelativeTime date={commit?.committer?.date} />
          </Typography>
        </Stack>
      </ListItemText>
    </ListItem>
  );
}

export default ListItemCommit;
