import { DiffLine, DiffLineType } from "@/generated/types";
import Box from "@mui/material/Box";
import TrChunkHeader from "./TrChunkHeader";
import TrLine from "./TrLine";
import { Range } from "@/utils/relay";

interface Props {
  lines: DiffLine[];
  onClick: (range: Range) => void;
}

export default function TableDiff(props: Props) {
  const { lines, onClick } = props;

  return (
    <Box component="table" sx={{ borderSpacing: 0, width: "100%" }}>
      <tbody>
        {lines.map((diffLine, index) =>
          diffLine.type === DiffLineType.Meta ? (
            <TrChunkHeader
              key={index}
              previousNewNumber={lines[index - 1]?.newNumber}
              diffLine={diffLine}
              onClick={onClick}
            />
          ) : (
            <TrLine key={index} diffLine={diffLine} />
          )
        )}
      </tbody>
    </Box>
  );
}
