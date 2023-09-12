import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import { useUserQuery } from "../generated/types";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import { useFullPath } from "../utils/router";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar from "./Sidebar";

const items = (username: string) => [
  {
    key: `/${username}`,
    icon: <PersonIcon />,
    text: "用户",
    to: `/${username}`,
  },
  {
    key: `/users/${username}/groups`,
    icon: <GroupsIcon />,
    text: "组织",
    to: `/users/${username}/groups`,
  },
];

const breadcrumbItems = (username: string): BreadcrumbItems => ({
  [`/${username}`]: [{ to: `/${username}`, text: username }],
  [`/users/${username}/groups`]: [
    { to: `/${username}`, text: username },
    { to: `/users/${username}/groups`, text: "组织" },
  ],
});

function User() {
  const username = useFullPath();
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
      <Sidebar items={items(username)} />
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

export default User;
