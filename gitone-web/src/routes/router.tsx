import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../layout";
import NotFoundPage from "../pages/NotFoundPage";
import Dashboard from "../pages/dashboard";
import Explore from "../pages/explore";
import Groups from "../pages/groups";
import Namespace from "../pages/namespace";
import Profile from "../pages/profile";
import Projects from "../pages/projects";
import Session from "../pages/session";
import Users from "../pages/users";
import { paths } from "../utils/router";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/explore",
    element: <Layout.Explore />,
    children: [
      { index: true, element: <Explore.Projects /> },
      { path: "/explore/projects", element: <Explore.Projects /> },
      { path: "/explore/groups", element: <Explore.Groups /> },
    ],
  },
  { path: "/session/new", element: <Session.New /> },
  { path: "/users/new", element: <Users.New /> },
  { path: "/users/sent", element: <Users.Sent /> },
  { path: "/users/unactivate", element: <Users.Unactivate /> },
  { path: "/users/activate/:token", element: <Users.Activate /> },
  { path: "/users/forget-password", element: <Users.ForgetPassword /> },
  { path: "/users/reset-password/:token", element: <Users.ResetPassword /> },
  { path: "/users/confirm-email/:token", element: <Users.ConfirmEmail /> },
  {
    path: "/users/:path0",
    element: <Layout.User />,
    children: [
      { path: "projects", element: <Users.Projects /> },
      { path: "groups", element: <Users.Groups /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Layout.Dashboard />,
    children: [
      { index: true, element: <Dashboard.Projects /> },
      { path: "groups", element: <Dashboard.Groups /> },
      { path: "projects", element: <Dashboard.Projects /> },
    ],
  },
  {
    path: "/projects",
    element: <Layout.Dashboard />,
    children: [
      { index: true, element: <Projects.New /> },
      { path: "new", element: <Projects.New /> },
    ],
  },
  {
    path: "/groups",
    element: <Layout.Dashboard />,
    children: [
      { index: true, element: <Groups.New /> },
      { path: "new", element: <Groups.New /> },
    ],
  },
  {
    path: "/profile",
    element: <Layout.Profile />,
    children: [
      { index: true, element: <Profile.Index /> },
      { path: "account", element: <Profile.Account /> },
      { path: "emails", element: <Profile.Emails /> },
      { path: "password", element: <Profile.Password /> },
    ],
  },
  ...paths.map((path) => ({
    path: path,
    element: <Layout.Namespace />,
    children: [
      { index: true, element: <Namespace.Show /> },
      { path: "-/projects", element: <Namespace.Projects /> },
      { path: "-/members", element: <Namespace.Members /> },
      { path: "-/settings", element: <Namespace.Settings /> },
    ],
  })),
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
