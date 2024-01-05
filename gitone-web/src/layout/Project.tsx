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
import { Outlet } from "react-router-dom";
import Breadcrumbs, { BreadcrumbItems } from "./Breadcrumbs";
import Page from "./Page";
import Sidebar, { SidebarItems } from "./Sidebar";

const items = (
  fullPath: string,
  revisionPath: RevisionPath,
  actions: Array<Action>
): SidebarItems => {
  const { type, revision, path } = revisionPath;

  const items: SidebarItems = [
    {
      key: `/${fullPath}`,
      icon: <CodeIcon />,
      text: "概览",
      to: `/${fullPath}`,
    },
  ];
  if (revision) {
    items.push({
      key: `/${fullPath}/-/code`,
      icon: <CodeIcon />,
      text: "仓库",
      to: `/${fullPath}/-/code`,
      children: [
        {
          key: `/${fullPath}/-/${type}/${revision}/${path}`,
          text: "文件",
          to: `/${fullPath}/-/${type}/${revision}/${path}`,
        },
        {
          key: `/${fullPath}/-/commits/${revision}/${path}`,
          text: "提交",
          to: `/${fullPath}/-/commits/${revision}/${path}`,
        },
        {
          key: `/${fullPath}/-/branches`,
          text: "分支",
          to: `/${fullPath}/-/branches`,
        },
        {
          key: `/${fullPath}/-/tags`,
          text: "标签",
          to: `/${fullPath}/-/tags`,
        },
      ],
    });
  }
  items.push({
    key: `/${fullPath}/-/members`,
    icon: <PeopleIcon />,
    text: "成员",
    to: `/${fullPath}/-/members`,
  });
  items.push({
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
  });
  return items;
};

const breadcrumbItems = (
  paths: Array<string>,
  revisionPath: RevisionPath
): BreadcrumbItems => {
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
    [`/${fullPath}/-/commits/${revision}`]: [...fullPathItems],
    [`/${fullPath}/-/commits/${revision}/${path}`]: [
      ...fullPathItems,
      { to: `/${fullPath}/-/commits/${revision}/${path}`, text: "提交" },
    ],
    [`/${fullPath}/-/tree/${revision}`]: [...fullPathItems],
    [`/${fullPath}/-/tree/${revision}/${path}`]: [...fullPathItems],
    [`/${fullPath}/-/blob/${revision}/${path}`]: [...fullPathItems],
  };
};

function Project() {
  const { fullPath, paths, star } = useFullPath();
  const { loading: loadingViewer } = useViewerQuery();
  const { data, loading, error } = useProjectQuery({
    variables: { fullPath, revisionPath: star },
  });
  const actions = data?.namespacePolicy.actions;
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
      <Sidebar items={items(fullPath, revisionPath, actions)} />
      <Box sx={{ p: 1, flexGrow: 1 }}>
        <Toolbar />
        <Breadcrumbs items={breadcrumbItems(paths, revisionPath)} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Page>
  );
}

export default Project;
