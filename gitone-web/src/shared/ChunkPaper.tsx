import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  primary?: string;
}

function ChunkPaper(props: Props & BoxProps) {
  const { primary, ...boxProps } = props;

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      {primary && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {primary}
        </Typography>
      )}
      <Box {...boxProps} />
    </Paper>
  );
}

export default ChunkPaper;
