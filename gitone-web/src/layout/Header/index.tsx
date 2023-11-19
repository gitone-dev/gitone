import { useViewerQuery } from "@/generated/types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import NewMenu from "./NewMenu";
import UserMenu from "./UserMenu";


function Header() {
  const { data, loading } = useViewerQuery();
  const viewer = data?.viewer;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          GitOne
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Button
            sx={{ my: 2 }}
            color="inherit"
            component={RouterLink}
            to="/explore"
          >
            探索
          </Button>
        </Box>
        {!loading && !viewer && (
          <>
            <Button color="inherit" component={RouterLink} to="/session/new">
              登录
            </Button>
            <Button color="inherit" component={RouterLink} to="/users/new">
              注册
            </Button>
          </>
        )}
        {viewer && <NewMenu />}
        {viewer && <UserMenu viewer={viewer} />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
