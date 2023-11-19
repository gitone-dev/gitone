import CallMergeIcon from "@mui/icons-material/CallMerge";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import {
  Action,
  Branch,
  DeleteBranchInput,
  Policy,
} from "../../../../../generated/types";
import CommitTip from "../../../../../shared/CommitTip";
import RelativeTime from "../../../../../shared/RelativeTime";
import { SHA_ABBR_LENGTH } from "../../../../../utils/git";

interface Props {
  fullPath: string;
  policy: Policy;
  branch: Branch;
  onDelete: (input: DeleteBranchInput) => void;
}

function ListItemBranch(props: Props) {
  const {
    fullPath,
    policy: { actions },
    branch,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = () => {
    copy(branch.name);
    enqueueSnackbar(`已复制：${branch.name}`, { variant: "info" });
  };

  const onDelete = () => {
    props.onDelete({
      fullPath: fullPath,
      name: branch.name,
    });
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <ButtonGroup size="small">
          <Button size="small" onClick={onCopy} title="复制分支名">
            <ContentCopyIcon fontSize="small" />
          </Button>

          {actions.includes(Action.Update) && (
            <Button size="small" onClick={onDelete} title="删除分支">
              <DeleteIcon />
            </Button>
          )}
        </ButtonGroup>
      }
    >
      <ListItemIcon>
        <CallMergeIcon />
      </ListItemIcon>
      <ListItemText>
        <Link
          underline="hover"
          variant="body1"
          color="text.primary"
          component={RouterLink}
          to={`/${fullPath}/-/tree/${branch.name}`}
        >
          {branch.name}
        </Link>
        <Stack direction="row" spacing={1}>
          <Link
            color="text.secondary"
            component={RouterLink}
            to={`/${fullPath}/-/commit/${branch.commit?.sha}`}
            underline="hover"
            variant="body2"
          >
            <code>{branch.commit?.sha.substring(0, SHA_ABBR_LENGTH)}</code>
          </Link>
          <Typography color="text.secondary" variant="body2">
            {branch.commit?.committer?.name} 提交于
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <RelativeTime date={branch.commit?.committer?.date} />
          </Typography>
          <CommitTip fullPath={fullPath} commit={branch.commit} />
        </Stack>
      </ListItemText>
    </ListItem>
  );
}

export default ListItemBranch;
