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
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  { path: "/", element: <App /> },
  {
    path: "/explore",
    element: <Layout.Explore />,
    children: [
      { index: true, element: <Explore.Projects /> },
      { path: "projects", element: <Explore.Projects /> },
      { path: "groups", element: <Explore.Groups /> },
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
      { index: true, element: <Settings.Profile /> },
      { path: "profile", element: <Settings.Profile /> },
      { path: "account", element: <Settings.Account /> },
      { path: "emails", element: <Settings.Emails /> },
      { path: "password", element: <Settings.Password /> },
      {
        path: "ssh-keys",
        element: <Namespace.Settings.SshKeys.Index />,
      },
      {
        path: "registered-clients",
        children: [
          {
            index: true,
            element: <Namespace.Settings.RegisteredClients.Index />,
          },
          {
            path: "new",
            element: <Namespace.Settings.RegisteredClients.New />,
          },
          {
            path: ":id",
            element: <Namespace.Settings.RegisteredClients.Show />,
          },
        ],
      },
    ],
  },
  ...paths.map((path) => ({
    path: path,
    element: <Layout.Namespace />,
    children: [
      { index: true, element: <Namespace.Show /> },
      { path: "-/blob/*", element: <Projects.Blob /> },
      { path: "-/tree/*", element: <Projects.Tree /> },
      { path: "-/commit/*", element: <Projects.Commit /> },
      { path: "-/commits/*", element: <Projects.Commits /> },
      { path: "-/compare/*", element: <Projects.Compare /> },
      { path: "-/branches", element: <Projects.Branches /> },
      { path: "-/tags", element: <Projects.Tags.Index /> },
      { path: "-/tags/*", element: <Projects.Tags.Show /> },
      { path: "-/releases", element: <Projects.Releases.Index /> },
      { path: "-/releases/new", element: <Projects.Releases.New /> },
      { path: "-/releases/edit/*", element: <Projects.Releases.Edit /> },
      { path: "-/releases/*", element: <Projects.Releases.Show /> },
      { path: "-/members", element: <Namespace.Members /> },
      { path: "-/projects", element: <Groups.Projects /> },
      {
        path: "-/settings",
        children: [
          { index: true, element: <Namespace.Settings.Settings /> },
          {
            path: "ssh-keys",
            element: <Namespace.Settings.SshKeys.Index />,
          },
          {
            path: "registered-clients",
            children: [
              {
                index: true,
                element: <Namespace.Settings.RegisteredClients.Index />,
              },
              {
                path: "new",
                element: <Namespace.Settings.RegisteredClients.New />,
              },
              {
                path: ":id",
                element: <Namespace.Settings.RegisteredClients.Show />,
              },
            ],
          },
        ],
      },
    ],
  })),
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
