import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import debounce from "@mui/material/utils/debounce";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { GroupOrderField, Maybe, Visibility } from "../../generated/types";

function useSearch(props: Props) {
  const { isViewer } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const visibility = isViewer
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

interface Props {
  isViewer: boolean;
}

function Header(props: Props) {
  const { isViewer } = props;
  const {
    query,
    setQuery,
    visibility,
    setVisibility,
    orderField,
    setOrderField,
  } = useSearch(props);

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeVisibility = (event: SelectChangeEvent<string>) => {
    setVisibility(event.target.value as Visibility);
  };

  const onChangeOrderField = (event: SelectChangeEvent<string>) => {
    setOrderField(event.target.value as GroupOrderField);
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        autoFocus
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
        disabled={!isViewer}
        value={visibility || ""}
        name="visibility"
        onChange={onChangeVisibility}
      >
        <MenuItem disabled value="">
          <em>可见性</em>
        </MenuItem>
        <MenuItem value="">全部</MenuItem>
        <MenuItem value={Visibility.Public}>公开</MenuItem>
        <MenuItem value={Visibility.Private}>私有</MenuItem>
      </Select>
      <Select
        size="small"
        displayEmpty
        name="order"
        value={orderField}
        onChange={onChangeOrderField}
      >
        <MenuItem disabled value="">
          排序
        </MenuItem>
        <MenuItem value={GroupOrderField.CreatedAt}>创建时间</MenuItem>
        <MenuItem value={GroupOrderField.UpdatedAt}>更新时间</MenuItem>
        <MenuItem value={GroupOrderField.Path}>路径</MenuItem>
      </Select>
      {isViewer && (
        <Button variant="contained" component={RouterLink} to="/groups/new">
          新建组织
        </Button>
      )}
    </Stack>
  );
}

export default Header;
export { useSearch };
