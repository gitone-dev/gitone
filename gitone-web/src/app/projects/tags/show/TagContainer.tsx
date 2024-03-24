import {
  Action,
  Policy,
  useDeleteTagMutation,
  useTagQuery,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import RelativeTime from "@/shared/RelativeTime";
import { SHA_ABBR_LENGTH } from "@/utils/git";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

interface Props {
  fullPath: string;
  policy: Policy;
}

export default function TagContainer(props: Props) {
  const {
    fullPath,
    policy: { actions },
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const name = useParams()["*"] || "";
  const { data, loading, error } = useTagQuery({
    variables: {
      fullPath,
      name,
    },
  });

  const [deleteTagMutation] = useDeleteTagMutation({
    variables: {
      input: {
        fullPath: fullPath,
        name: name,
      },
    },
    onCompleted() {
      enqueueSnackbar("删除成功", { variant: "success" });
      navigate(`/${fullPath}/-/tags`);
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const tag = data?.repository.tag;
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!tag) {
    return <ErrorBox message="查询错误" />;
  }

  const onDelete = () => deleteTagMutation();

  return (
    <ChunkPaper
      primary={name || ""}
      action={
        <ButtonGroup>
          {!tag.isRelease && (
            <Button
              disabled={!actions.includes(Action.Update)}
              component={RouterLink}
              to={`/${fullPath}/-/releases/new`}
              state={tag}
            >
              新建发布
            </Button>
          )}
          {!tag.isRelease && (
            <Button
              disabled={!actions.includes(Action.Update)}
              onClick={onDelete}
            >
              删除标签
            </Button>
          )}
          {tag.isRelease && (
            <Button
              component={RouterLink}
              to={`/${fullPath}/-/releases/${name}`}
            >
              查看发布
            </Button>
          )}
        </ButtonGroup>
      }
    >
      <Stack direction="row" spacing={1}>
        {tag.tagger ? (
          <>
            <Typography color="text.secondary" variant="body2">
              {tag.tagger.name} 标记于
            </Typography>
            <Typography color="text.secondary" variant="body2">
              <RelativeTime date={tag.tagger.date} />
            </Typography>
            <Link
              color="text.secondary"
              component={RouterLink}
              to={`/${fullPath}/-/commit/${tag.commit?.sha}`}
              underline="hover"
              variant="body2"
            >
              <code>{tag.commit?.sha.substring(0, SHA_ABBR_LENGTH)}</code>
            </Link>
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
          </>
        )}
      </Stack>
      <Typography sx={{ whiteSpace: "pre-wrap", mt: 1 }} variant="body2">
        {tag.fullMessage || tag.commit?.fullMessage}
      </Typography>
      <List dense>
        <ListItem disablePadding>
          <ListItemButton href={`/${fullPath}/-/archive/${name}.zip`}>
            <ListItemIcon>
              <FolderZipIcon />
            </ListItemIcon>
            <ListItemText>源码（ .zip）</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href={`/${fullPath}/-/archive/${name}.tar.gz`}>
            <ListItemIcon>
              <FolderZipIcon />
            </ListItemIcon>
            <ListItemText>源码（.tar.gz）</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </ChunkPaper>
  );
}
