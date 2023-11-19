import { Access, Maybe, MemberOrderField } from "@/generated/types";
import debounce from "@mui/material/utils/debounce";
import { useSearchParams } from "react-router-dom";

export default function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const access = searchParams.get("access") as Access;
  const orderField =
    (searchParams.get("orderField") as MemberOrderField) ||
    MemberOrderField.CreatedAt;

  const setQuery = debounce((query: string) => {
    searchParams.set("query", query);
    setSearchParams(searchParams, { replace: true });
  }, 500);

  const setAccess = (access: Maybe<Access>) => {
    if (access) {
      searchParams.set("access", access);
    } else {
      searchParams.delete("access");
    }
    setSearchParams(searchParams, { replace: true });
  };

  const setOrderField = (orderField: Maybe<MemberOrderField>) => {
    if (orderField) {
      searchParams.set("orderField", orderField);
    } else {
      searchParams.set("orderField", MemberOrderField.CreatedAt);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return {
    query,
    setQuery,
    access,
    setAccess,
    orderField,
    setOrderField,
  };
}
