const PREFIX = "id:gitone";

type ResolvedGlobalId = {
  type: string;
  id: number;
};

export type Range = [number, number];

function fromGlobalId(globalId: string): ResolvedGlobalId {
  const split = globalId.split("/");
  if (split.length !== 3) {
    throw new Error("invalid id");
  } else if (split[0] !== PREFIX) {
    throw new Error("invalid id");
  }
  return {
    type: split[1],
    id: Number(split[2]),
  };
}

function blobLineCursor(number: number) {
  return btoa(JSON.stringify({ number }));
}

export { fromGlobalId, blobLineCursor };
