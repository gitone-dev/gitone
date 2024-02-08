import App from "@/App";
import NotFoundPage from "@/app/NotFoundPage";
import Dashboard from "@/app/dashboard";
import Explore from "@/app/explore";
import Groups from "@/app/groups";
import Namespace from "@/app/namespace";
import Projects from "@/app/projects";
import Session from "@/app/session";
import Settings from "@/app/settings";
import Users from "@/app/users";
import Layout from "@/layout";
import { paths } from "@/utils/router";
import { createBrowserRouter } from "react-router-dom";

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
    path: "-/settings",
    element: <Layout.Settings />,
    children: [
      { index: true, element: <Settings.Index /> },
      { path: "account", element: <Settings.Account /> },
      { path: "emails", element: <Settings.Emails /> },
      { path: "password", element: <Settings.Password /> },
      { path: "ssh-keys", element: <Settings.SshKeys /> },
      {
        path: "registered-clients",
        children: [
          { index: true, element: <Settings.RegisteredClients.Index /> },
          { path: "new", element: <Settings.RegisteredClients.New /> },
          { path: ":id", element: <Settings.RegisteredClients.Show /> },
        ],
      },
    ],
  },
  ...paths.map((path) => ({
    path: path,
    element: <Layout.Namespace />,
    children: [
      { index: true, element: <Namespace.Show /> },
      { path: "-/blob/*", element: <Namespace.Blob /> },
      { path: "-/branches", element: <Namespace.Branches /> },
      { path: "-/commit/*", element: <Namespace.Commit /> },
      { path: "-/commits/*", element: <Namespace.Commits /> },
      { path: "-/projects", element: <Namespace.Projects /> },
      { path: "-/members", element: <Namespace.Members /> },
      { path: "-/tags", element: <Namespace.Tags /> },
      { path: "-/tree/*", element: <Namespace.Tree /> },
      {
        path: "-/settings",
        children: [
          { index: true, element: <Namespace.Settings.Settings /> },
          {
            path: "ssh-keys",
            element: <Namespace.Settings.SshKeys />,
          },
        ],
      },
    ],
  })),
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
