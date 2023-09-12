import { Access, Maybe } from "../generated/types";

const Accesses = [
  Access.NoAccess,
  Access.Reporter,
  Access.Maintainer,
  Access.Owner,
];

function ge(a: Access, b?: Maybe<Access>) {
  return Accesses.indexOf(a) >= Accesses.indexOf(b || Access.NoAccess);
}

export { Accesses, ge };
