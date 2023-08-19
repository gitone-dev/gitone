import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useViewerQuery } from "../../generated/types";
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link color="inherit" underline="none" component={RouterLink} to="/">
            GitOne
          </Link>
        </Typography>
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
        {viewer && <UserMenu viewer={viewer} />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
