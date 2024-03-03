import { Diff, DiffLine, DiffLineType, DiffType, useBlobLinesLazyQuery } from "@/generated/types";
import { Range, blobLineCursor } from "@/utils/relay";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TableDiff from "./TableDiff";

interface Props {
  fullPath: string;
  leftRevision: string | undefined | null;
  rightRevision: string;
  diff: Diff;
}

export default function DiffAccordion(props: Props) {
  const { fullPath, leftRevision, rightRevision, diff } = props;
  const [lines, setLines] = useState(diff.lines || []);
  const { enqueueSnackbar } = useSnackbar();
  const [blobLinesLazyQuery] = useBlobLinesLazyQuery();
  const [revision, path] =
    diff.type === DiffType.Delete
      ? [leftRevision, diff.oldPath]
      : [rightRevision, diff.newPath];

  const onCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    copy(path || "");
    enqueueSnackbar(`已复制：${path}`, { variant: "info" });
  };

  const onClick = (range: Range) => {
    if (!rightRevision || !diff.newPath) return;

    console.log(range);
    const first = range[1] - range[0] + 1;
    const after = blobLineCursor(range[0] - 1);

    console.log(range);

    blobLinesLazyQuery({
      variables: {
        fullPath: fullPath,
        revision: rightRevision,
        path: diff.newPath,
        first,
        after,
      },
      onCompleted(data) {
        const aLines: Array<DiffLine> = [];

        const edges = data.repository.blob?.lines?.edges || [];
        for (let iLine = 0; iLine < lines.length; iLine++) {
          const line = lines[iLine];
          if (line.newNumber == range[0]) {
            for (let iEdge = 0; iEdge < edges.length; iEdge++) {
              const edge = edges[iEdge];
              aLines.push({
                type: DiffLineType.Expand,
                oldNumber: iEdge + line.oldNumber,
                newNumber: edge.node.number || 0,
                html: edge.node.html,
              });
            }
          } else if (line.newNumber == range[1]) {
            for (let iEdge = 0; iEdge < edges.length; iEdge++) {
              const edge = edges[iEdge];
              aLines.push({
                type: DiffLineType.Expand,
                oldNumber: line.oldNumber + iEdge - edges.length + 1,
                newNumber: edge.node.number || 0,
                html: edge.node.html,
              });
            }
          } else {
            aLines.push(line);
          }
        }
        setLines(aLines);
      },
    });
    console.log("click", { first, after });
  };

  return (
    <Box pb={2}>
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1,
          borderRadius: 0,
          backgroundColor: "rgb(246, 248, 250)",
          position: "sticky",
          top: 68,
          zIndex: 1,
          boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.1)",
        }}
      >
        <Stack spacing={1} direction="row">
          <Typography lineHeight={2}>{path}</Typography>
          <IconButton size="small" onClick={onCopy} title="复制分支名">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <Link
            component={RouterLink}
            to={`/${fullPath}/-/blob/${revision}/${path}`}
          >
            查看文件
          </Link>
        </Stack>
      </Paper>
      <Paper elevation={2} sx={{ borderRadius: 0, overflowX: "clip" }}>
        <TableDiff lines={lines} onClick={onClick} />
      </Paper>
    </Box>
  );
}
