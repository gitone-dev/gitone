import { BlobLineEdge } from "@/generated/types";
import Box from "@mui/material/Box";
import TrLine, { Range } from "./TrLine";

interface Props {
  edges: Array<BlobLineEdge>;
  range: Range;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function TableCode(props: Props) {
  const { edges, range, onClick } = props;

  return (
    <Box component="table" sx={{ borderSpacing: 0, width: "100%" }}>
      <tbody>
        {edges.map((edge) => (
          <TrLine
            key={edge.cursor}
            blobLine={edge.node}
            range={range}
            onClick={onClick}
          />
        ))}
      </tbody>
    </Box>
  );
}
