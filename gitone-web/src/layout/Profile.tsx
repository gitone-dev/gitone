import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import { useViewerQuery } from "../generated/types";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar from "./Sidebar";

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
  {
    key: "/profile/emails",
    icon: <EmailIcon />,
    text: "邮箱管理",
    to: "/profile/emails",
  },
  {
    key: "/profile/password",
    icon: <LockIcon />,
    text: "密码管理",
    to: "/profile/password",
  },
];

const breadcrumbItems: BreadcrumbItems = {
  "/profile": [
    { to: "/profile", text: "用户设置" },
    { to: "/profile", text: "个人资料" },
  ],
  "/profile/account": [
    { to: "/profile", text: "用户设置" },
    { to: "/profile/account", text: "账号管理" },
  ],
  "/profile/emails": [
    { to: "/profile", text: "用户设置" },
    { to: "/profile/emails", text: "邮箱管理" },
  ],
  "/profile/password": [
    { to: "/profile", text: "用户设置" },
    { to: "/profile/password", text: "密码管理" },
  ],
};

function Profile() {
  const { loading, error } = useViewerQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <Page sx={{ display: "flex" }}>
      <Sidebar items={items} />
      <Box sx={{ mx: 2, my: 1, width: "100%" }}>
        <Toolbar />
        <Breadcrumbs items={breadcrumbItems} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Page>
  );
}

export default Profile;
