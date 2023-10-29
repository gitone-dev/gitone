import { useSearch } from "../../namespace/members/MembersContainer/Header";
import MembersContainer from "../../namespace/members/MembersContainer/MembersContainer";
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
