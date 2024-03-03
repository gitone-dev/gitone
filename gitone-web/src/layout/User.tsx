import ErrorPage from "@/app/ErrorPage";
import LoadingPage from "@/app/LoadingPage";
import { useUserQuery } from "@/generated/types";
import { useFullPath } from "@/utils/router";
import CodeIcon from "@mui/icons-material/Code";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar, { SidebarItems } from "./Sidebar";

function sidebarItems(pathname: string, username: string): SidebarItems {
  return [
    {
      key: `/${username}`,
      icon: <PersonIcon />,
      text: "用户",
      to: `/${username}`,
      selected: `/${username}` === pathname,
    },
    {
      key: `/users/${username}/projects`,
      icon: <CodeIcon />,
      text: "项目",
      to: `/users/${username}/projects`,
      selected: `/users/${username}/projects` === pathname,
    },
    {
      key: `/users/${username}/groups`,
      icon: <GroupsIcon />,
      text: "组织",
      to: `/users/${username}/groups`,
      selected: `/users/${username}/groups` === pathname,
    },
  ];
}

function breadcrumbItems(username: string): BreadcrumbItems {
  return {
    [`/${username}`]: [{ to: `/${username}`, text: username }],
    [`/users/${username}/projects`]: [
      { to: `/${username}`, text: username },
      { to: `/users/${username}/projects`, text: "项目" },
    ],
    [`/users/${username}/groups`]: [
      { to: `/${username}`, text: username },
      { to: `/users/${username}/groups`, text: "组织" },
    ],
  };
}

export default function User() {
  const { pathname } = useLocation();
  const { fullPath: username } = useFullPath();
  const { loading, error } = useUserQuery({
    variables: { username },
  });

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <Page sx={{ display: "flex" }}>
      <Sidebar items={sidebarItems(pathname, username)} />
      <Box sx={{ mx: 2, my: 1, width: "100%" }}>
        <Toolbar />
        <Breadcrumbs items={breadcrumbItems(username)} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Page>
  );
}
