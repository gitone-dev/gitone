import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import debounce from "@mui/material/utils/debounce";
import { useSearchParams } from "react-router-dom";
import { Action, Maybe, Policy, SshKeyOrderField } from "../../../../../generated/types";

function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const orderField =
    (searchParams.get("orderField") as SshKeyOrderField) ||
    SshKeyOrderField.CreatedAt;

  const setQuery = debounce((query: string) => {
    searchParams.set("query", query);
    setSearchParams(searchParams, { replace: true });
  }, 500);

  const setOrderField = (orderField: Maybe<SshKeyOrderField>) => {
    if (orderField) {
      searchParams.set("orderField", orderField);
    } else {
      searchParams.set("orderField", SshKeyOrderField.CreatedAt);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return {
    query,
    setQuery,
    orderField,
    setOrderField,
  };
}

interface Props {
  poliicy: Policy;
  onClick?: () => void;
}

function Header(props: Props) {
  const {
    poliicy: { actions },
    onClick,
  } = props;

  const { query, setQuery, orderField, setOrderField } = useSearch();

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeOrderField = (event: SelectChangeEvent<string>) => {
    setOrderField(event.target.value as SshKeyOrderField);
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        sx={{ flexGrow: 1 }}
        size="small"
        defaultValue={query}
        onChange={onChangeQuery}
        name="query"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Select
        size="small"
        displayEmpty
        name="sort"
        value={orderField}
        onChange={onChangeOrderField}
      >
        <MenuItem disabled value="">
          排序
        </MenuItem>
        <MenuItem value={SshKeyOrderField.CreatedAt}>创建时间</MenuItem>
        <MenuItem value={SshKeyOrderField.UpdatedAt}>更新时间</MenuItem>
      </Select>
      {actions.includes(Action.Update) && (
        <Button variant="contained" onClick={onClick}>
          添加 SSH 公钥
        </Button>
      )}
    </Stack>
  );
}

export default Header;
export { useSearch };
