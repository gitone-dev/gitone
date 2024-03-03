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
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar, { SidebarItems } from "./Sidebar";

function sidebarItems(
  pathname: string,
  fullPath: string,
  actions: Array<Action>
): SidebarItems {
  return [
    {
      key: `/${fullPath}`,
      icon: <GroupIcon />,
      text: "概览",
      to: `/${fullPath}`,
      selected: `/${fullPath}` === pathname,
    },
    {
      key: `/${fullPath}/-/projects`,
      icon: <CodeIcon />,
      text: "项目",
      to: `/${fullPath}/-/projects`,
      selected: `/${fullPath}/-/projects` === pathname,
    },
    {
      key: `/${fullPath}/-/members`,
      icon: <PeopleIcon />,
      text: "成员",
      to: `/${fullPath}/-/members`,
      selected: `/${fullPath}/-/members` === pathname,
    },
    {
      key: `/${fullPath}/-/settings`,
      icon: <SettingsIcon />,
      text: "设置",
      to: `/${fullPath}/-/settings`,
      hidden: !actions.includes(Action.Update),
      selected: false,
      children: [
        {
          key: `/${fullPath}/-/settings`,
          text: "基本设置",
          to: `/${fullPath}/-/settings`,
          hidden: !actions.includes(Action.Update),
          selected: `/${fullPath}/-/settings` === pathname,
        },
        {
          key: `/${fullPath}/-/settings/ssh-keys`,
          text: "SSH 公钥",
          to: `/${fullPath}/-/settings/ssh-keys`,
          hidden: !actions.includes(Action.Update),
          selected: `/${fullPath}/-/settings/ssh-keys` === pathname,
        },
        {
          key: `/${fullPath}/-/settings/registered-clients`,
          text: "OIDC 客户端",
          to: `/${fullPath}/-/settings/registered-clients`,
          hidden: !actions.includes(Action.Update),
          selected: pathname.startsWith(
            `/${fullPath}/-/settings/registered-clients`
          ),
        },
      ],
    },
  ];
}

function breadcrumbItems(paths: Array<string>): BreadcrumbItems {
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
    [`/${fullPath}/-/settings/registered-clients`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/settings/registered-clients`, text: "OIDC 客户端" },
    ],
    [`/${fullPath}/-/settings/registered-clients/new`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/settings/registered-clients`, text: "OIDC 客户端" },
      { to: `/${fullPath}/-/settings/registered-clients/new`, text: "新建" },
    ],
  };
}

export default function Group() {
  const { pathname } = useLocation();
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
      <Sidebar items={sidebarItems(pathname, fullPath, actions)} />
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
