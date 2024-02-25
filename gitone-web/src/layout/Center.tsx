import Box, { BoxProps } from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Page from "./Page";

export default function Center(props: BoxProps) {
  return (
    <Page>
      <Container component="main" maxWidth="sm">
        <Toolbar />
        <Stack direction="row" sx={{ boxShadow: 3, marginTop: 8 }}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box width={160} p={2}>
              <Typography variant="h4" color="white" textAlign="left">
                GitOne
              </Typography>
              <Typography variant="subtitle1" color="white" textAlign="right">
                —— 代码管理平台
              </Typography>
            </Box>
          </Box>
          <Box {...props} flexGrow={1} />
        </Stack>
      </Container>
    </Page>
  );
}
