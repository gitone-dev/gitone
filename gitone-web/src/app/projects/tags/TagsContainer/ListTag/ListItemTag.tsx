import {
  Action,
  DeleteTagInput,
  Policy,
  Tag,
} from "@/generated/types";
import CommitTip from "@/shared/CommitTip";
import RelativeTime from "@/shared/RelativeTime";
import TagTip from "@/shared/TagTip";
import { SHA_ABBR_LENGTH } from "@/utils/git";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import SellIcon from "@mui/icons-material/Sell";
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

interface Props {
  fullPath: string;
  policy: Policy;
  tag: Tag;
  onDelete: (input: DeleteTagInput) => void;
}

function ListItemTag(props: Props) {
  const {
    fullPath,
    policy: { actions },
    tag,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = () => {
    copy(tag.name);
    enqueueSnackbar(`已复制：${tag.name}`, { variant: "info" });
  };

  const onDelete = () => {
    props.onDelete({
      fullPath: fullPath,
      name: tag.name,
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
        <SellIcon />
      </ListItemIcon>
      <ListItemText>
        <Link
          color="text.primary"
          component={RouterLink}
          to={`/${fullPath}/-/tree/${tag.name}`}
          underline="hover"
          variant="body1"
        >
          {tag.name}
        </Link>
        <Stack direction="row" spacing={1}>
          {tag.tagger ? (
            <>
              <Typography color="text.secondary" variant="body2">
                {tag.tagger.name} 创建于
              </Typography>
              <Typography color="text.secondary" variant="body2">
                <RelativeTime date={tag.tagger.date} />
              </Typography>
              <TagTip tag={tag} />
            </>
          ) : (
            <>
              <Link
                color="text.secondary"
                component={RouterLink}
                to={`/${fullPath}/-/commit/${tag.commit?.sha}`}
                underline="hover"
                variant="body2"
              >
                <code>{tag.commit?.sha.substring(0, SHA_ABBR_LENGTH)}</code>
              </Link>
              <Typography color="text.secondary" variant="body2">
                {tag.commit?.committer?.name} 提交于
              </Typography>
              <Typography color="text.secondary" variant="body2">
                <RelativeTime date={tag.commit?.committer?.date} />
              </Typography>
              <CommitTip fullPath={fullPath} commit={tag.commit} />
            </>
          )}
        </Stack>
      </ListItemText>
    </ListItem>
  );
}

export default ListItemTag;
