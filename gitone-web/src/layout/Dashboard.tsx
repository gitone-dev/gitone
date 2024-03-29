import ErrorPage from "@/app/ErrorPage";
import LoadingPage from "@/app/LoadingPage";
import { useViewerQuery } from "@/generated/types";
import CodeIcon from "@mui/icons-material/Code";
import GroupsIcon from "@mui/icons-material/Groups";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar, { SidebarItems } from "./Sidebar";

function sidebarItems(pathname: string): SidebarItems {
  return [
    {
      key: "/dashboard/projects",
      icon: <CodeIcon />,
      text: "项目",
      to: "/dashboard/projects",
      selected: ["/dashboard", "/dashboard/projects", "/projects/new"].includes(
        pathname
      ),
    },
    {
      key: "/dashboard/groups",
      icon: <GroupsIcon />,
      text: "组织",
      to: "/dashboard/groups",
      selected: ["/dashboard/groups", "/groups/new"].includes(pathname),
    },
  ];
}

const breadcrumbItems: BreadcrumbItems = {
  "/dashboard": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/projects", text: "项目" },
  ],
  "/dashboard/projects": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/projects", text: "项目" },
  ],
  "/dashboard/groups": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/groups", text: "组织" },
  ],
  "/projects/new": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/projects", text: "项目" },
    { to: "/projects/new", text: "新建" },
  ],
  "/groups": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/groups", text: "组织" },
    { to: "/groups/new", text: "新建" },
  ],
  "/groups/new": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/groups", text: "组织" },
    { to: "/groups/new", text: "新建" },
  ],
};

export default function Dashboard() {
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
