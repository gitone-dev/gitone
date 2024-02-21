import { useSearch } from "@/app/namespace/members/MembersContainer";
import MembersContainer from "@/app/namespace/members/MembersContainer/MembersContainer";
import { useFullPath } from "@/utils/router";

export default function Members() {
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
