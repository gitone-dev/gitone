import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import debounce from "@mui/material/utils/debounce";
import { useSearchParams } from "react-router-dom";
import { RevisionPath } from "../../../../generated/types";
import RefSwitcher from "../../../../shared/RefSwitcher";

function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const setQuery = debounce((query: string) => {
    searchParams.set("query", query);
    setSearchParams(searchParams, { replace: true });
  }, 500);

  return {
    query,
    setQuery,
  };
}

interface Props {
  fullPath: string;
  revisionPath: RevisionPath;
}

function Header(props: Props) {
  const { fullPath, revisionPath } = props;

  const { query, setQuery } = useSearch();

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Stack direction="row" spacing={1}>
      <RefSwitcher
        fullPath={fullPath}
        type="commits"
        revisionPath={revisionPath}
      />
      <TextField
        autoFocus
        sx={{ flexGrow: 1 }}
        size="small"
        defaultValue={query}
        onChange={onChangeQuery}
        name="query"
        placeholder="TODO"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}

export default Header;
export { useSearch };
