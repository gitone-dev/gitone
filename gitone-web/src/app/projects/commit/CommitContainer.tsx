import { useCommitQuery } from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import RelativeTime from "@/shared/RelativeTime";
import { SHA_ABBR_LENGTH } from "@/utils/git";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import DiffsContainer from "./DiffsContainer";

interface Props {
  fullPath: string;
  revision: string;
  path?: string;
}

export default function CommitContainer(props: Props) {
  const { fullPath, revision } = props;

  const { data, loading, error } = useCommitQuery({
    variables: { fullPath, revision },
  });

  const commit = data?.repository?.commit;
  const policy = data?.namespacePolicy;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!commit || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <ChunkPaper
        primary="提交"
        action={
          <Link component={RouterLink} to={`/${fullPath}/-/tree/${commit.sha}`}>
            浏览文件
          </Link>
        }
      >
        <Stack direction="row" spacing={1}>
          <Typography component="pre" variant="body2">
            {commit.sha.substring(0, SHA_ABBR_LENGTH)}
          </Typography>
          <Typography color="text.primary" variant="body2">
            {commit?.committer?.name} 提交于{" "}
            <RelativeTime date={commit?.committer?.date} />
          </Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack direction="row" spacing={1}>
          <span>parent</span>
          {commit.parentShas?.map((sha) => (
            <Link
              key={sha}
              component={RouterLink}
              to={`/${fullPath}/-/commit/${sha}`}
            >
              {sha.substring(0, SHA_ABBR_LENGTH)}
            </Link>
          ))}
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="inherit"
          whiteSpace="pre-wrap"
          fontFamily="monospace"
        >
          {commit.fullMessage}
        </Typography>
      </ChunkPaper>
      <DiffsContainer
        fullPath={fullPath}
        leftRevision={commit.parentShas && commit.parentShas[0]}
        rightRevision={commit.sha}
      />
    </>
  );
}
