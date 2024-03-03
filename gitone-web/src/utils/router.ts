import { useLocation, useParams } from "react-router-dom";

const paths: Array<string> = [];
const segments: Array<string> = [];

for (let i = 0, path = ""; i < 5; i++) {
  path = `${path}/:path${i}`;
  paths.push(path);

  segments.push(`path${i}`);
}

/*
 * 路由：
 *
 * /${fullPath}
 * /${fullPath}/-/blob/${revision}${path}
 * /${fullPath}/-/tree/${revision}${path}
 * /${fullPath}/-/commit/${revision}${path}
 * /${fullPath}/-/commits/${revision}${path}
 * /${fullPath}/-/compare/${left}...${right}
 */
export function useFullPath() {
  const params = useParams();
  const { pathname } = useLocation();

  const paths: Array<string> = [];
  segments.forEach((segment) => {
    const path = params[segment];
    if (!path) return;
    paths.push(path);
  });
  const fullPath = paths.join("/");

  let star = params["*"] || "";
  let [left, right] = ["", ""];
  if (pathname.startsWith(`/${fullPath}/-/compare/`)) {
    if (star.includes("...")) {
      [left, right] = star.split("...", 2);
    } else {
      [left, right] = ["", star];
    }
    star = right;
  }

  return { paths, fullPath, star, left, right };
}

export { paths, segments };
