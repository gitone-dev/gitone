import GroupsIcon from "@mui/icons-material/Groups";
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
    key: "/dashboard/groups",
    icon: <GroupsIcon />,
    text: "组织",
    to: "/dashboard/groups",
  },
];

const breadcrumbItems: BreadcrumbItems = {
  "/dashboard": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/groups", text: "组织" },
  ],
  "/dashboard/groups": [
    { to: "/dashboard", text: "工作台" },
    { to: "/dashboard/groups", text: "组织" },
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

function Dashboard() {
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

export default Dashboard;
