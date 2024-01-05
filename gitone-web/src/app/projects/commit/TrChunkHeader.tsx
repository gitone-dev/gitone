import { DiffLine } from "@/generated/types";
import { Range } from "@/utils/relay";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { blue, grey } from "@mui/material/colors";

interface ArrowButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent) => void;
}

function ArrowButton(props: ArrowButtonProps) {
  const { children, onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      size="small"
      component="td"
      sx={{
        py: 0,
        width: 36,
        minWidth: 36,
        height: "1.2rem",
        lineHeight: "1.2rem",
        display: "table-cell",
        borderRadius: 0,
        backgroundColor: blue[100],
        ":hover": {
          backgroundColor: blue[200],
        },
      }}
    >
      {children}
    </IconButton>
  );
}

interface Props {
  diffLine: DiffLine;
  previousNewNumber?: number;
  onClick: (range: Range) => void;
}

export default function TrChunkHeader(props: Props) {
  const { diffLine, previousNewNumber, onClick } = props;
  const { oldNumber, newNumber } = diffLine;
  const disabled = newNumber === 0;
  if (disabled) return <></>;

  const onDownward = () => {
    onClick([(previousNewNumber || 0) + 1, newNumber]);
  };

  const onUpward = () => {
    onClick([(previousNewNumber || 0) + 1, newNumber]);
  };

  console.log({ previousNewNumber, newNumber });

  return (
    <Box key={`L${oldNumber}:R${newNumber}`} component="tr">
      <ArrowButton
        children={<ArrowUpwardIcon fontSize="small" />}
        onClick={onUpward}
      />
      <ArrowButton
        children={<ArrowDownwardIcon fontSize="small" />}
        onClick={onDownward}
      />
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
            px: 0.5,
            content: "' '",
          },
          backgroundColor: blue[50],
          color: grey[600],
        }}
        dangerouslySetInnerHTML={{ __html: diffLine.html || "" }}
      />
    </Box>
  );
}
