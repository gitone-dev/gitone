const SHA_ABBR_LENGTH = 8;

function pathEqual(left: string, right: string) {
  if (left.endsWith("/")) left = left.substring(0, left.length - 1);
  if (right.endsWith("/")) right = right.substring(0, right.length - 1);
  return left === right;
}

export { SHA_ABBR_LENGTH, pathEqual };
