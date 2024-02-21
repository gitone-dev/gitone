import {
  Action,
  OrderDirection,
  Policy,
  SshKeyOrderField,
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
import { useState } from "react";
import NewDialog from "./NewDialog";
import useSearch from "./useSearch";

interface Props {
  fullPath: string;
  policy: Policy;
  onClick?: () => void;
}

export default function Header(props: Props) {
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
    setOrderField(event.target.value as SshKeyOrderField);
  };

  const onChangeOrderDirection = (field: SshKeyOrderField) => {
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
          value={SshKeyOrderField.CreatedAt}
          onClick={onChangeOrderDirection(SshKeyOrderField.CreatedAt)}
        >
          创建时间
        </MenuItem>
        <MenuItem
          value={SshKeyOrderField.UpdatedAt}
          onClick={onChangeOrderDirection(SshKeyOrderField.UpdatedAt)}
        >
          更新时间
        </MenuItem>
      </Select>
      {actions.includes(Action.Update) && (
        <Button variant="contained" onClick={onClick}>
          新建
        </Button>
      )}
      <NewDialog fullPath={fullPath} open={open} onClose={onClose} />
    </Stack>
  );
}
