const UNITS = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const THRESH = 1024;

function humanReadable(bytes: number, dp = 1) {
  if (Math.abs(bytes) < THRESH) {
    return bytes + " B";
  }

  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= THRESH;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= THRESH &&
    u < UNITS.length - 1
  );

  return bytes.toFixed(dp) + " " + UNITS[u];
}

export { humanReadable };
