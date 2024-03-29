import { RevisionPath, useRevisionPathQuery } from "@/generated/types";
import Breadcrumbs, { BreadcrumbItems } from "@/layout/Breadcrumbs";
import ChunkPaper from "@/shared/ChunkPaper";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import RefSwitcher from "@/shared/RefSwitcher";
import { useFullPath } from "@/utils/router";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import CodePopper from "./CodePopper";
import TreeContainer from "./TreeContainer";

const breadcrumbItems = (
  fullPath: string,
  revisionPath: RevisionPath
): BreadcrumbItems => {
  const items = [];
  const paths = revisionPath.path.split("/");

  for (let i = 0; i < paths.length; i++) {
    const path = paths.slice(0, i + 1).join("/");
    items.push({
      to: `/${fullPath}/-/tree/${revisionPath.revision}/${path}`,
      text: paths[i],
    });
  }

  return {
    [`/${fullPath}/-/tree/${revisionPath.revision}/${revisionPath.path}`]: [
      ...items,
    ],
  };
};

export default function Tree() {
  const { fullPath, star } = useFullPath();
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useRevisionPathQuery({
    variables: { fullPath, revisionPath: star },
  });

  const revisionPath = data?.repository.revisionPath;
  const isRoot = !revisionPath?.path;

  const onCopy = () => {
    if (!revisionPath?.path) return;

    copy(revisionPath.path);
    enqueueSnackbar(`已复制：${revisionPath.path}`, { variant: "info" });
  };

  const getPathname = (
    type: string,
    revision: string,
    path: string
  ): string => {
    return `/${fullPath}/-/${type}/${revision}/${path}`;
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
        justifyContent={isRoot ? "space-between" : "flex-start"}
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
          type="tree"
          revisionPath={revisionPath}
          getPathname={getPathname}
        />
        {!isRoot && (
          <>
            <Breadcrumbs items={breadcrumbItems(fullPath, revisionPath)} />
            <IconButton onClick={onCopy}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </>
        )}
        {isRoot && (
          <CodePopper fullPath={fullPath} revision={revisionPath.revision} />
        )}
      </Stack>
      <ChunkPaper primary="">
        <TreeContainer fullPath={fullPath} revisionPath={revisionPath} />
      </ChunkPaper>
    </>
  );
}
