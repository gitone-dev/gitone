import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import { RevisionPath, useRevisionPathQuery } from "../../../generated/types";
import Breadcrumbs, { BreadcrumbItems } from "../../../layout/Breadcrumbs";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import RefSwitcher from "../../../shared/RefSwitcher";
import { useFullPath } from "../../../utils/router";
import BlobContainer from "./BlobContainer";

const breadcrumbItems = (
  fullPath: string,
  revisionPath: RevisionPath
): BreadcrumbItems => {
  const items = [];
  const paths = revisionPath.path.split("/");

  for (let i = 1; i < paths.length; i++) {
    const path = paths.slice(0, i).join("/");
    items.push({
      to: `/${fullPath}/-/tree/${revisionPath.revision}/${path}`,
      text: paths[i - 1],
    });
  }
  items.push({
    to: `/${fullPath}/-/blob/${revisionPath.revision}/${revisionPath.path}`,
    text: paths[paths.length - 1],
  });

  return {
    [`/${fullPath}/-/blob/${revisionPath.revision}/${revisionPath.path}`]: [
      ...items,
    ],
  };
};

function Show() {
  const { fullPath, star } = useFullPath();
  const { data, loading, error } = useRevisionPathQuery({
    variables: { fullPath, revisionPath: star },
  });

  const revisionPath = data?.repository.revisionPath;
  const { enqueueSnackbar } = useSnackbar();

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
      <Stack direction="row" spacing={1} alignItems="center" pt={2}>
        <RefSwitcher
          fullPath={fullPath}
          type="blob"
          revisionPath={revisionPath}
        />
        <Breadcrumbs items={breadcrumbItems(fullPath, revisionPath)} />
        {revisionPath.path && (
          <IconButton onClick={onClick}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
      <BlobContainer fullPath={fullPath} revisionPath={revisionPath} />
    </>
  );
}

export default Show;
