import {
  Action,
  OrderDirection,
  Policy,
  ReleaseOrderField,
} from "@/generated/types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import useSearch from "./useSearch";

interface Props {
  fullPath: string;
  policy: Policy;
  onClick?: () => void;
}

export default function Header(props: Props) {
  const {
    policy: { actions },
  } = props;
  const {
    query,
    setQuery,
    orderField,
    setOrderField,
    orderDirection,
    setOrderDirection,
  } = useSearch();

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeOrderField = (event: SelectChangeEvent<string>) => {
    setOrderField(event.target.value as ReleaseOrderField);
  };

  const onChangeOrderDirection = (field: ReleaseOrderField) => {
    return () => {
      if (field !== orderField) return;

      if (orderDirection === OrderDirection.Asc) {
        setOrderDirection(OrderDirection.Desc);
      } else {
        setOrderDirection(OrderDirection.Asc);
      }
    };
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        sx={{ flexGrow: 1 }}
        size="small"
        defaultValue={query}
        onChange={onChangeQuery}
        placeholder="标签名"
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
        name="sort"
        value={orderField}
        onChange={onChangeOrderField}
        input={
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                {orderDirection === OrderDirection.Asc ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )}
              </InputAdornment>
            }
          />
        }
      >
        <MenuItem disabled value="">
          排序
        </MenuItem>
        <MenuItem
          value={ReleaseOrderField.TagName}
          onClick={onChangeOrderDirection(ReleaseOrderField.TagName)}
        >
          标签名
        </MenuItem>
        <MenuItem
          value={ReleaseOrderField.CreatedAt}
          onClick={onChangeOrderDirection(ReleaseOrderField.CreatedAt)}
        >
          提交时间
        </MenuItem>
      </Select>
      {actions.includes(Action.Update) && (
        <Button variant="contained" component={RouterLink} to="new">
          新建
        </Button>
      )}
    </Stack>
  );
}
