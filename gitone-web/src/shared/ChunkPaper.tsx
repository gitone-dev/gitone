import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  primary: string;
}

function ChunkPaper(props: Props & BoxProps) {
  const { primary, ...boxProps } = props;

  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Typography variant="h6">{primary}</Typography>
      <Box {...boxProps} />
    </Paper>
  );
}

export default ChunkPaper;
