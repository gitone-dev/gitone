import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import debounce from "@mui/material/utils/debounce";
import { useSearchParams } from "react-router-dom";
import {
  Access,
  Action,
  Maybe,
  MemberOrderField,
  Policy,
} from "../../../../generated/types";

function useSearch() {
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

interface Props {
  poliicy: Policy;
  onClick?: () => void;
}

function Header(props: Props) {
  const {
    poliicy: { actions },
    onClick,
  } = props;

  const { query, setQuery, access, setAccess, orderField, setOrderField } =
    useSearch();

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeAccess = (event: SelectChangeEvent<string>) => {
    setAccess(event.target.value as Access);
  };

  const onChangeOrderField = (event: SelectChangeEvent<string>) => {
    setOrderField(event.target.value as MemberOrderField);
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
        sx={{ width: 140 }}
        size="small"
        displayEmpty
        name="访问权限"
        value={access || ""}
        onChange={onChangeAccess}
      >
        <MenuItem disabled value="">
          <em>访问等级</em>
        </MenuItem>
        <MenuItem value="">全部</MenuItem>
        <MenuItem value={Access.Owner}>所有者</MenuItem>
        <MenuItem value={Access.Maintainer}>维护者</MenuItem>
        <MenuItem value={Access.Reporter}>报告者</MenuItem>
      </Select>
      <Select
        sx={{ width: 140 }}
        size="small"
        displayEmpty
        name="sort"
        value={orderField}
        onChange={onChangeOrderField}
      >
        <MenuItem disabled value="">
          排序
        </MenuItem>
        <MenuItem value={MemberOrderField.CreatedAt}>创建时间</MenuItem>
        <MenuItem value={MemberOrderField.UpdatedAt}>更新时间</MenuItem>
        <MenuItem value={MemberOrderField.Access}>可访问性</MenuItem>
        <MenuItem value={MemberOrderField.Username}>用户名</MenuItem>
      </Select>
      {actions.includes(Action.CreateMember) && (
        <Button size="small" variant="contained" onClick={onClick}>
          添加成员
        </Button>
      )}
    </Stack>
  );
}

export default Header;
export { useSearch };
