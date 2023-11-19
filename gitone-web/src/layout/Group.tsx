import ErrorPage from "@/app/ErrorPage";
import LoadingPage from "@/app/LoadingPage";
import { Action, useGroupQuery, useViewerQuery } from "@/generated/types";
import { useFullPath } from "@/utils/router";
import CodeIcon from "@mui/icons-material/Code";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar, { SidebarItems } from "./Sidebar";

const items = (fullPath: string, actions: Array<Action>): SidebarItems => [
  {
    key: `/${fullPath}`,
    icon: <GroupIcon />,
    text: "概览",
    to: `/${fullPath}`,
  },
  {
    key: `/${fullPath}/-/projects`,
    icon: <CodeIcon />,
    text: "项目",
    to: `/${fullPath}/-/projects`,
  },
  {
    key: `/${fullPath}/-/members`,
    icon: <PeopleIcon />,
    text: "成员",
    to: `/${fullPath}/-/members`,
  },
  {
    key: `/${fullPath}/-/settings`,
    icon: <SettingsIcon />,
    text: "设置",
    to: `/${fullPath}/-/settings`,
    hidden: !actions.includes(Action.Update),
    children: [
      {
        key: `/${fullPath}/-/settings`,
        text: "基本设置",
        to: `/${fullPath}/-/settings`,
        hidden: !actions.includes(Action.Update),
      },
      {
        key: `/${fullPath}/-/settings/ssh-keys`,
        text: "SSH 公钥",
        to: `/${fullPath}/-/settings/ssh-keys`,
        hidden: !actions.includes(Action.Update),
      },
    ],
  },
];

const breadcrumbItems = (paths: Array<string>): BreadcrumbItems => {
  const fullPathItems = [];
  for (let i = 0; i < paths.length; i++) {
    const fullPath = paths.slice(0, i + 1).join("/");
    fullPathItems.push({ to: `/${fullPath}`, text: paths[i] });
  }
  const fullPath = paths.join("/");

  return {
    [`/${fullPath}`]: fullPathItems,
    [`/${fullPath}/-/projects`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/projects`, text: "项目" },
    ],
    [`/${fullPath}/-/members`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/members`, text: "成员" },
    ],
    [`/${fullPath}/-/settings`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/settings`, text: "设置" },
    ],
    [`/${fullPath}/-/settings/ssh-keys`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/settings/ssh-keys`, text: "SSH 公钥" },
    ],
  };
};

function Group() {
  const { fullPath, paths } = useFullPath();
  const { loading: loadingViewer } = useViewerQuery();
  const { data, loading, error } = useGroupQuery({
    variables: { fullPath },
  });
  const actions = data?.namespacePolicy.actions;

  if (loading || loadingViewer) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else if (!actions) {
    return <ErrorPage message="客户端查询条件错误" />;
  }

  return (
    <Page sx={{ display: "flex" }}>
      <Sidebar items={items(fullPath, actions)} />
      <Box sx={{ mx: 2, my: 1, width: "100%" }}>
        <Toolbar />
        <Breadcrumbs items={breadcrumbItems(paths)} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Page>
  );
}

export default Group;
