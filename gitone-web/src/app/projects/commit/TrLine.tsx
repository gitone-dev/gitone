import { DiffLine, DiffLineType } from "@/generated/types";
import Box from "@mui/material/Box";
import { blueGrey, deepOrange, green, grey } from "@mui/material/colors";

function getSide(diffLine: DiffLine) {
  let backgroundColor = "inherit";
  let oldNumber: number | null = diffLine.oldNumber;
  let newNumber: number | null = diffLine.newNumber;

  if (diffLine.type === DiffLineType.Delete) {
    backgroundColor = deepOrange[100];
    newNumber = null;
  } else if (diffLine.type === DiffLineType.Add) {
    backgroundColor = green[100];
    oldNumber = null;
  } else if (diffLine.type === DiffLineType.Expand) {
    backgroundColor = blueGrey[50];
  }

  return {
    oldNumber,
    newNumber,
    sx: {
      py: 0,
      pr: 1,
      width: 36,
      minWidth: 36,
      height: "1.2rem",
      lineHeight: "1.2rem",
      textAlign: "right",
      cursor: "pointer",
      color: grey[600],
      backgroundColor,
      ":before": {
        content: "attr(data-line-number)",
      },
    },
  };
}

function byType(type: DiffLineType) {
  switch (type) {
    case DiffLineType.Add:
      return ['"+"', green[50]];
    case DiffLineType.Delete:
      return ['"-"', deepOrange[50]];
    case DiffLineType.Expand:
      return ['" "', blueGrey[50]];
    default:
      return ['" "', "inhert"];
  }
}

interface Props {
  diffLine: DiffLine;
}

export default function TrDiffLine(props: Props) {
  const { diffLine } = props;
  const { oldNumber, newNumber, sx } = getSide(diffLine);
  const [content, backgroundColor] = byType(diffLine.type);

  return (
    <Box key={`L${oldNumber}:R${newNumber}`} component="tr">
      <Box component="td" pl={2} sx={sx} data-line-number={oldNumber} />
      <Box component="td" pl={1} sx={sx} data-line-number={newNumber} />
      <Box
        component="td"
        sx={{
          py: 0,
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          height: "1.2rem",
          lineHeight: "1.2rem",
          "::before": {
            color: grey[600],
            content: content,
            px: 0.5,
          },
          backgroundColor,
        }}
        dangerouslySetInnerHTML={{ __html: diffLine.html || "" }}
      />
    </Box>
  );
}
