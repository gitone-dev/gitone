import GroupsIcon from "@mui/icons-material/Groups";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar from "./Sidebar";

const items = [
  {
    key: "/explore/groups",
    icon: <GroupsIcon />,
    text: "组织",
    to: "/explore/groups",
  },
];

const breadcrumbItems: BreadcrumbItems = {
  "/explore": [
    { to: "/explore", text: "探索" },
    { to: "/explore/groups", text: "组织" },
  ],
  "/explore/groups": [
    { to: "/explore", text: "探索" },
    { to: "/explore/groups", text: "组织" },
  ],
};

const Explore = () => {
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
};

export default Explore;
