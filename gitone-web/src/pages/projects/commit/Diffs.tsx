import Box, { BoxProps } from "@mui/material/Box";
import { DiffEdge } from "../../../generated/types";
import DiffAccordion from "./DiffAccordion";

interface Props {
  fullPath: string;
  edges: Array<DiffEdge>;
}

function Diffs(props: Props & BoxProps) {
  const { fullPath, edges, ...boxProps } = props;

  return (
    <Box {...boxProps}>
      {edges.map((edge) => (
        <DiffAccordion fullPath={fullPath} diff={edge.node} key={edge.cursor} />
      ))}
    </Box>
  );
}

export default Diffs;
