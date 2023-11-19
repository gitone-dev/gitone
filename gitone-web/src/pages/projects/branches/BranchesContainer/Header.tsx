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
import debounce from "@mui/material/utils/debounce";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Action,
  BranchOrderField,
  Maybe,
  OrderDirection,
  Policy,
} from "../../../../generated/types";
import NewDialog from "./NewDialog";

function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const setQuery = debounce((query: string) => {
    searchParams.set("query", query);
    setSearchParams(searchParams, { replace: true });
  }, 500);

  const orderField =
    (searchParams.get("orderField") as BranchOrderField) ||
    BranchOrderField.CommitterDate;
  const setOrderField = (orderField: Maybe<BranchOrderField>) => {
    if (orderField) {
      searchParams.set("orderField", orderField);
    } else {
      searchParams.set("orderField", BranchOrderField.CommitterDate);
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

interface Props {
  fullPath: string;
  policy: Policy;
  onClick?: () => void;
}

function Header(props: Props) {
  const {
    fullPath,
    policy: { actions },
  } = props;
  const [open, setOpen] = useState(false);
  const {
    query,
    setQuery,
    orderField,
    setOrderField,
    orderDirection,
    setOrderDirection,
  } = useSearch();

  const onClick = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeOrderField = (event: SelectChangeEvent<string>) => {
    setOrderField(event.target.value as BranchOrderField);
  };

  const onChangeOrderDirection = (field: BranchOrderField) => {
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
        placeholder="分支名"
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
        displayEmpty
        sx={{ width: 140 }}
        size="small"
        name="sort"
        value={orderField}
        onChange={onChangeOrderField}
        input={
          <OutlinedInput
            size="small"
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
          value={BranchOrderField.Name}
          onClick={onChangeOrderDirection(BranchOrderField.Name)}
        >
          名称
        </MenuItem>
        <MenuItem
          value={BranchOrderField.CommitterDate}
          onClick={onChangeOrderDirection(BranchOrderField.CommitterDate)}
        >
          提交时间
        </MenuItem>
      </Select>
      {actions.includes(Action.Update) && (
        <Button variant="contained" onClick={onClick}>
          新建分支
        </Button>
      )}
      <NewDialog fullPath={fullPath} open={open} onClose={onClose} />
    </Stack>
  );
}

export default Header;
export { useSearch };
