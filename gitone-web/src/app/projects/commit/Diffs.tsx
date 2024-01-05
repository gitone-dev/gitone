import { DiffEdge, PageInfo } from "@/generated/types";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import DiffAccordion from "./DiffAccordion";

interface Props {
  fullPath: string;
  oldRevision: string | undefined | null;
  newRevision: string;
  edges: Array<DiffEdge>;
  pageInfo: PageInfo;
  loadMore: () => void;
}

export default function Diffs(props: Props & BoxProps) {
  const {
    fullPath,
    oldRevision,
    newRevision,
    edges,
    pageInfo,
    loadMore,
    ...boxProps
  } = props;

  return (
    <Box {...boxProps}>
      {edges.map((edge) => (
        <DiffAccordion
          key={edge.cursor}
          fullPath={fullPath}
          oldRevision={oldRevision}
          newRevision={newRevision}
          diff={edge.node}
        />
      ))}
      <Button
        fullWidth
        variant="text"
        color="primary"
        onClick={loadMore}
        sx={{ textAlign: "center" }}
        disabled={!pageInfo.hasNextPage}
      >
        {pageInfo.hasNextPage ? "加载更多" : "没有更多了"}
      </Button>
    </Box>
  );
}
