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
      key: "/explore/projects",
      icon: <CodeIcon />,
      text: "项目",
      to: "/explore/projects",
      selected: ["/explore", "/explore/projects"].includes(pathname),
    },
    {
      key: "/explore/groups",
      icon: <GroupsIcon />,
      text: "组织",
      to: "/explore/groups",
      selected: "/explore/groups" === pathname,
    },
  ];
}

const breadcrumbItems: BreadcrumbItems = {
  "/explore": [
    { to: "/explore", text: "探索" },
    { to: "/explore/projects", text: "项目" },
  ],
  "/explore/projects": [
    { to: "/explore", text: "探索" },
    { to: "/explore/projects", text: "项目" },
  ],
  "/explore/groups": [
    { to: "/explore", text: "探索" },
    { to: "/explore/groups", text: "组织" },
  ],
};

export default function Explore() {
  const { pathname } = useLocation();
  const { loading } = useViewerQuery();

  if (loading) {
    return <LoadingPage />;
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
