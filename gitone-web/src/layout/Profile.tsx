import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useViewerQuery } from "../generated/types";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import ListItemLink from "../shared/ListItemLink";
import Page from "./Page";

const items = [
  {
    key: "/profile",
    icon: <AccountCircleIcon />,
    text: "个人资料",
    to: "/profile",
  },
  {
    key: "/profile/account",
    icon: <ManageAccountsIcon />,
    text: "账号管理",
    to: "/profile/account",
  },
];

function Profile(props: BoxProps) {
  const { pathname } = useLocation();
  const { loading, error } = useViewerQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <Page sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          width: 200,
        }}
        PaperProps={{
          sx: {
            boxShadow: 3,
            boxSizing: "border-box",
            width: 200,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {items.map((item) => (
              <ListItemLink {...item} />
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ margin: 2, width: "100%" }}>
        <Toolbar />
        <Breadcrumbs>
          <Link
            color="inherit"
            component={RouterLink}
            to="/profile"
            underline="hover"
          >
            用户设置
          </Link>
          <Typography color="text.primary">
            {items.find((item) => item.to === pathname)?.text}
          </Typography>
        </Breadcrumbs>
        <Divider sx={{ my: 2 }} />
        <Box {...props} />
      </Box>
    </Page>
  );
}

export default Profile;
