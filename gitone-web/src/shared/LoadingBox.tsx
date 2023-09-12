import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingBox() {
  return (
    <Box textAlign="center" mt={2}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingBox;
