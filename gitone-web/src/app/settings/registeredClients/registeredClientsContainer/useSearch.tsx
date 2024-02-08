import {
  Maybe,
  OrderDirection,
  RegisteredClientOrderField,
} from "@/generated/types";
import debounce from "@mui/material/utils/debounce";
import { useSearchParams } from "react-router-dom";

export default function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const setQuery = debounce((query: string) => {
    searchParams.set("query", query);
    setSearchParams(searchParams, { replace: true });
  }, 500);

  const orderField =
    (searchParams.get("orderField") as RegisteredClientOrderField) ||
    RegisteredClientOrderField.CreatedAt;
  const setOrderField = (orderField: Maybe<RegisteredClientOrderField>) => {
    if (orderField) {
      searchParams.set("orderField", orderField);
    } else {
      searchParams.set("orderField", RegisteredClientOrderField.CreatedAt);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const orderDirection =
    (searchParams.get("orderDirection") as OrderDirection) ||
    OrderDirection.Desc;
  const setOrderDirection = (orderDirection: Maybe<OrderDirection>) => {
    if (orderDirection) {
      searchParams.set("orderDirection", orderDirection);
    } else {
      searchParams.set("orderDirection", OrderDirection.Desc);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return {
    query,
    setQuery,
    orderField,
    setOrderField,
    orderDirection,
    setOrderDirection,
  };
}
