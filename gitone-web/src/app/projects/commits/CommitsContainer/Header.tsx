import { RevisionPath } from "@/generated/types";
import RefSwitcher from "@/shared/RefSwitcher";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useSearch from "./useSearch";

interface Props {
  fullPath: string;
  revisionPath: RevisionPath;
}

export default function Header(props: Props) {
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
