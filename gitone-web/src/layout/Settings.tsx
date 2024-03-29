import ErrorPage from "@/app/ErrorPage";
import LoadingPage from "@/app/LoadingPage";
import { useViewerQuery } from "@/generated/types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar, { SidebarItems } from "./Sidebar";

function sidebarItems(pathname: string): SidebarItems {
  return [
    {
      key: "/-/settings/profile",
      icon: <AccountCircleIcon />,
      text: "个人资料",
      to: "/-/settings/profile",
      selected: "/-/settings/profile" === pathname,
    },
    {
      key: "/-/settings/account",
      icon: <ManageAccountsIcon />,
      text: "账号管理",
      to: "/-/settings/account",
      selected: "/-/settings/account" === pathname,
    },
    {
      key: "/-/settings/emails",
      icon: <EmailIcon />,
      text: "邮箱管理",
      to: "/-/settings/emails",
      selected: "/-/settings/emails" === pathname,
    },
    {
      key: "/-/settings/password",
      icon: <LockIcon />,
      text: "密码管理",
      to: "/-/settings/password",
      selected: "/-/settings/password" === pathname,
    },
    {
      key: "/-/settings/ssh-keys",
      icon: <KeyIcon />,
      text: "SSH 公钥",
      to: "/-/settings/ssh-keys",
      selected: "/-/settings/ssh-keys" === pathname,
    },
    {
      key: "/-/settings/registered-clients",
      icon: <WifiTetheringIcon />,
      text: "OIDC 客户端",
      to: "/-/settings/registered-clients",
      selected: pathname.startsWith("/-/settings/registered-clients"),
    },
  ];
}

const breadcrumbItems: BreadcrumbItems = {
  "/-/settings": [{ to: "/-/settings", text: "用户设置" }],
  "/-/settings/profile": [
    { to: "/-/settings", text: "用户设置" },
    { to: "/-/settings/profile", text: "个人资料" },
  ],
  "/-/settings/account": [
    { to: "/-/settings", text: "用户设置" },
    { to: "/-/settings/account", text: "账号管理" },
  ],
  "/-/settings/emails": [
    { to: "/-/settings", text: "用户设置" },
    { to: "/-/settings/emails", text: "邮箱管理" },
  ],
  "/-/settings/password": [
    { to: "/-/settings", text: "用户设置" },
    { to: "/-/settings/password", text: "密码管理" },
  ],
  "/-/settings/ssh-keys": [
    { to: "/-/settings", text: "用户设置" },
    { to: "/-/settings/ssh-keys", text: "SSH 公钥" },
  ],
  "/-/settings/registered-clients": [
    { to: "/-/settings", text: "用户设置" },
    { to: "/-/settings/registered-clients", text: "OIDC 客户端" },
  ],
  "/-/settings/registered-clients/new": [
    { to: "/-/settings", text: "用户设置" },
    { to: "/-/settings/registered-clients", text: "OIDC 客户端" },
    { to: "/-/settings/registered-clients/new", text: "新建" },
  ],
};

export default function Settings() {
  const { pathname } = useLocation();
  const { loading, error } = useViewerQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <Page sx={{ display: "flex" }}>
      <Sidebar items={sidebarItems(pathname)} />
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
