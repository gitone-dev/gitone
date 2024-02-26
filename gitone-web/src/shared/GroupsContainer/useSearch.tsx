import { GroupOrderField, Maybe, Visibility } from "@/generated/types";
import debounce from "@mui/material/utils/debounce";
import { useSearchParams } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

export default function useSearch(props: Props) {
  const { isLoggedIn } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const visibility = isLoggedIn
    ? (searchParams.get("visibility") as Visibility)
    : Visibility.Public;
  const orderField =
    (searchParams.get("orderField") as GroupOrderField) ||
    GroupOrderField.CreatedAt;

  const setQuery = debounce((query: string) => {
    searchParams.set("query", query);
    setSearchParams(searchParams, { replace: true });
  }, 500);

  const setVisibility = (visibility: Maybe<Visibility>) => {
    if (visibility) {
      searchParams.set("visibility", visibility);
    } else {
      searchParams.delete("visibility");
    }
    setSearchParams(searchParams, { replace: true });
  };

  const setOrderField = (orderField: Maybe<GroupOrderField>) => {
    if (orderField) {
      searchParams.set("orderField", orderField);
    } else {
      searchParams.set("orderField", GroupOrderField.CreatedAt);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return {
    query,
    setQuery,
    visibility,
    setVisibility,
    orderField,
    setOrderField,
  };
}
