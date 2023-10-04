import { useParams } from "react-router-dom";

const paths: Array<string> = [];
const segments: Array<string> = [];

for (let i = 0, path = ""; i < 5; i++) {
  path = `${path}/:path${i}`;
  paths.push(path);

  segments.push(`path${i}`);
}

function useFullPath() {
  const params = useParams();

  const paths: Array<string> = [];
  segments.forEach((segment) => {
    const path = params[segment];
    if (!path) return;
    paths.push(path);
  });

  const fullPath = paths.join("/");
  return { paths, fullPath };
}

export { paths, segments, useFullPath };
