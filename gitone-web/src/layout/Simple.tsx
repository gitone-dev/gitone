import Box, { BoxProps } from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Page from "./Page";

function Simple(props: BoxProps) {
  return (
    <Page>
      <Container component="main" maxWidth="sm">
        <Toolbar />
        <Stack direction="row">
          <Box {...props} />
        </Stack>
      </Container>
    </Page>
  );
}

export default Simple;
