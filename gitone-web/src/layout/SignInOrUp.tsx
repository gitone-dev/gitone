import Box, { BoxProps } from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import { useViewerQuery } from "../generated/types";
import LoadingPage from "../pages/LoadingPage";
import Page from "./Page";

function SignInOrUp(props: BoxProps) {
  const { data, loading } = useViewerQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (data?.viewer) {
    return <Navigate to="/" />;
  }

  return (
    <Page>
      <Container component="main" maxWidth="sm">
        <Toolbar />
        <Stack direction="row" sx={{ boxShadow: 3, marginTop: 8 }}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              minWidth: 160,
              maxWidthh: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" color="white">
              GitOne
            </Typography>
          </Box>
          <Box {...props} flexGrow={1} />
        </Stack>
      </Container>
    </Page>
  );
}

export default SignInOrUp;
