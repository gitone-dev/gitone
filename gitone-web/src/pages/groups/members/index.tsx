import MembersContainer, { useSearch } from "../../namespace/members/MembersContainer";
import { useFullPath } from "../../../utils/router";

function Members() {
  const { fullPath } = useFullPath();
  const { orderField, query, access } = useSearch();

  return (
    <MembersContainer
      fullPath={fullPath}
      query={query}
      access={access}
      orderField={orderField}
    />
  );
}

export default Members;
