import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  primary: string;
  action?: React.ReactNode;
}

function ChunkPaper(props: Props & BoxProps) {
  const { primary, action, ...boxProps } = props;

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Stack
        sx={{ mb: 1 }}
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6">{primary}</Typography>
        {action}
      </Stack>
      <Box {...boxProps} />
    </Paper>
  );
}

export default ChunkPaper;
