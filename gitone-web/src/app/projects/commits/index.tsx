import { Policy, RevisionPath, useRevisionPathQuery } from "@/generated/types";
import Breadcrumbs, { BreadcrumbItems } from "@/layout/Breadcrumbs";
import ChunkPaper from "@/shared/ChunkPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import RefSwitcher from "@/shared/RefSwitcher";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import CommitsContainer from "./CommitsContainer";

const breadcrumbItems = (
  fullPath: string,
  revisionPath: RevisionPath
): BreadcrumbItems => {
  const items = [];
  const paths = revisionPath.path.split("/");

  for (let i = 1; i < paths.length; i++) {
    const path = paths.slice(0, i).join("/");
    items.push({
      to: `/${fullPath}/-/commits/${revisionPath.revision}/${path}`,
      text: paths[i - 1],
    });
  }
  items.push({
    to: `/${fullPath}/-/commits/${revisionPath.revision}/${revisionPath.path}`,
    text: paths[paths.length - 1],
  });

  return {
    [`/${fullPath}/-/commits/${revisionPath.revision}/${revisionPath.path}`]: [
      ...items,
    ],
  };
};

interface Props {
  fullPath: string;
  policy: Policy;
  star: string | null | undefined;
}

function Commits(props: Props) {
  const { fullPath, policy, star } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useRevisionPathQuery({
    variables: { fullPath, revisionPath: star },
  });

  const revisionPath = data?.repository.revisionPath;

  const onClick = () => {
    if (!revisionPath?.path) return;

    copy(revisionPath.path);
    enqueueSnackbar(`已复制：${revisionPath.path}`, { variant: "info" });
  };

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!revisionPath) {
    return <ErrorBox message="客户端查询条件错误：revision" />;
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          backgroundColor: "white",
          pt: 2,
          position: "sticky",
          top: 60,
          zIndex: 1,
        }}
      >
        <RefSwitcher
          fullPath={fullPath}
          type="commits"
          revisionPath={revisionPath}
        />
        <Breadcrumbs items={breadcrumbItems(fullPath, revisionPath)} />
        {revisionPath.path && (
          <IconButton onClick={onClick}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
      <ChunkPaper primary="提交列表">
        <CommitsContainer
          fullPath={fullPath}
          policy={policy}
          revisionPath={revisionPath}
        />
      </ChunkPaper>
    </>
  );
}

export default Commits;
