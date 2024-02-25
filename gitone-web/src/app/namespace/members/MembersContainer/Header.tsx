import { Access, Action, MemberOrderField, Policy } from "@/generated/types";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useSearch from "./useSearch";

interface Props {
  poliicy: Policy;
  onClick?: () => void;
}

export default function Header(props: Props) {
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
        <Button variant="contained" onClick={onClick}>
          添加
        </Button>
      )}
    </Stack>
  );
}
