import { DeleteTagInput, Policy, Tag } from "@/generated/types";
import CommitTip from "@/shared/CommitTip";
import RelativeTime from "@/shared/RelativeTime";
import TagTip from "@/shared/TagTip";
import { SHA_ABBR_LENGTH } from "@/utils/git";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SellIcon from "@mui/icons-material/Sell";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import TagMenu from "./TagMenu";

interface Props {
  fullPath: string;
  policy: Policy;
  tag: Tag;
  onDelete: (input: DeleteTagInput) => void;
}

export default function ListItemTag(props: Props) {
  const { fullPath, policy, tag } = props;
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
        <TagMenu
          fullPath={fullPath}
          policy={policy}
          tag={tag}
          onDelete={onDelete}
        />
      }
    >
      <ListItemIcon>
        <SellIcon />
      </ListItemIcon>
      <ListItemText>
        <Link
          color="text.primary"
          component={RouterLink}
          to={`/${fullPath}/-/tags/${tag.name}`}
          underline="hover"
          variant="body1"
        >
          {tag.name}
        </Link>
        <IconButton size="small" onClick={onCopy} title="复制标签名">
          <ContentCopyIcon fontSize="small" />
        </IconButton>
        <Stack direction="row" spacing={1}>
          {tag.tagger ? (
            <>
              <Typography color="text.secondary" variant="body2">
                {tag.tagger.name} 标记于
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
