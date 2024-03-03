import ErrorPage from "@/app/ErrorPage";
import LoadingPage from "@/app/LoadingPage";
import {
  Action,
  RevisionPath,
  useProjectQuery,
  useViewerQuery,
} from "@/generated/types";
import { useFullPath } from "@/utils/router";
import CodeIcon from "@mui/icons-material/Code";
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
  defaultBranch: string | undefined,
  revisionPath: RevisionPath,
  actions: Array<Action>
): SidebarItems {
  const { type, revision, path } = revisionPath;

  const items: SidebarItems = [
    {
      key: `/${fullPath}`,
      icon: <CodeIcon />,
      text: "概览",
      to: `/${fullPath}`,
      selected: `/${fullPath}` === pathname,
    },
  ];
  if (defaultBranch && revision) {
    items.push({
      key: `/${fullPath}/-/code`,
      icon: <CodeIcon />,
      text: "仓库",
      to: `/${fullPath}/-/code`,
      selected: false,
      children: [
        {
          key: `/${fullPath}/-/${type}/${revision}/${path}`,
          text: "文件",
          to: `/${fullPath}/-/${type}/${revision}/${path}`,
          selected: pathname.startsWith(`/${fullPath}/-/${type}/`),
        },
        {
          key: `/${fullPath}/-/commits/${revision}/${path}`,
          text: "提交",
          to: `/${fullPath}/-/commits/${revision}/${path}`,
          selected: pathname.startsWith(`/${fullPath}/-/commit`),
        },
        {
          key: `/${fullPath}/-/branches`,
          text: "分支",
          to: `/${fullPath}/-/branches`,
          selected: `/${fullPath}/-/branches` === pathname,
        },
        {
          key: `/${fullPath}/-/tags`,
          text: "标签",
          to: `/${fullPath}/-/tags`,
          selected: `/${fullPath}/-/tags` === pathname,
        },
        {
          key: `/${fullPath}/-/compare/${defaultBranch}...${revision}`,
          text: "对比",
          to: `/${fullPath}/-/compare/${defaultBranch}...${revision}`,
          selected: pathname.startsWith(`/${fullPath}/-/compare/`),
        },
      ],
    });
  }
  items.push({
    key: `/${fullPath}/-/members`,
    icon: <PeopleIcon />,
    text: "成员",
    to: `/${fullPath}/-/members`,
    selected: `/${fullPath}/-/members` === pathname,
  });
  items.push({
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
    ],
  });
  return items;
}

function breadcrumbItems(
  paths: Array<string>,
  revisionPath: RevisionPath,
  left: string,
  right: string
): BreadcrumbItems {
  const { revision, path } = revisionPath;

  const fullPathItems = [];
  for (let i = 0; i < paths.length; i++) {
    const fullPath = paths.slice(0, i + 1).join("/");
    fullPathItems.push({ to: `/${fullPath}`, text: paths[i] });
  }
  const fullPath = paths.join("/");

  return {
    [`/${fullPath}`]: fullPathItems,
    [`/${fullPath}/-/branches`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/branches`, text: "分支" },
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
      { to: `/${fullPath}/-/settings`, text: "设置" },
      { to: `/${fullPath}/-/settings/ssh-keys`, text: "SSH 公钥" },
    ],
    [`/${fullPath}/-/tags`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/tags`, text: "标签" },
    ],
    [`/${fullPath}/-/commit/${revision}`]: [...fullPathItems],
    [`/${fullPath}/-/commits/${revision}`]: [...fullPathItems],
    [`/${fullPath}/-/commits/${revision}/${path}`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/commits/${revision}/${path}`, text: "提交" },
    ],
    [`/${fullPath}/-/tree/${revision}`]: [...fullPathItems],
    [`/${fullPath}/-/tree/${revision}/${path}`]: [...fullPathItems],
    [`/${fullPath}/-/blob/${revision}`]: [...fullPathItems],
    [`/${fullPath}/-/blob/${revision}/${path}`]: [...fullPathItems],
    [`/${fullPath}/-/compare/${right}`]: [...fullPathItems],
    [`/${fullPath}/-/compare/${left}...${right}`]: [...fullPathItems],
  };
}

export default function Project() {
  const { pathname } = useLocation();
  const { fullPath, paths, star, left, right } = useFullPath();
  const { loading: loadingViewer } = useViewerQuery();
  const { data, loading, error } = useProjectQuery({
    variables: { fullPath, revisionPath: star },
  });
  const actions = data?.namespacePolicy.actions;
  const defaultBranch = data?.repository.defaultBranch?.name;
  const revisionPath = data?.repository.revisionPath;

  if (loading || loadingViewer) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else if (!actions || !revisionPath) {
    return <ErrorPage message="客户端查询条件错误" />;
  }

  return (
    <Page sx={{ display: "flex" }}>
      <Sidebar
        items={sidebarItems(
          pathname,
          fullPath,
          defaultBranch,
          revisionPath,
          actions
        )}
      />
      <Box sx={{ p: 1, flexGrow: 1 }}>
        <Toolbar />
        <Breadcrumbs
          items={breadcrumbItems(paths, revisionPath, left, right)}
        />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Page>
  );
}
