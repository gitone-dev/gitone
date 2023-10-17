import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import debounce from "@mui/material/utils/debounce";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Access,
  CreateMemberInput,
  Maybe,
  OrderDirection,
  Policy,
  UserEdge,
  UserFilter,
  UserOrderField,
  useUsersLazyQuery,
} from "../../generated/types";
import { ge } from "../../utils/access";

interface Props {
  fullPath: string;
  policy: Policy;
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateMemberInput) => void;
}

function NewDialog(props: Props) {
  const {
    fullPath,
    policy: { access },
    open,
    onClose,
    onCreate,
  } = props;
  const [options, setOptions] = useState<UserEdge[]>([]);
  const { register, handleSubmit, setValue } = useForm<CreateMemberInput>();
  const [usersLazyQuery, { loading }] = useUsersLazyQuery({
    fetchPolicy: "network-only",
    variables: {
      orderBy: {
        direction: OrderDirection.Asc,
        field: UserOrderField.Username,
      },
    },
  });

  const usersQuery = useMemo(
    () =>
      debounce((query: string) => {
        const filterBy: UserFilter = { query };
        usersLazyQuery({
          variables: { filterBy },
          onCompleted(data) {
            setOptions(data.users?.edges || []);
          },
        });
      }, 500),
    [usersLazyQuery]
  );
  const onChange = (_event: any, edge: Maybe<UserEdge>) => {
    if (edge) setValue("userId", edge.node.id);
  };
  const onInputChange = (_event: any, value: string) => {
    usersQuery(value);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit(onCreate)}
    >
      <DialogTitle>添加成员</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          sx={{ display: "none" }}
          {...register("fullPath", { value: fullPath })}
        />
        <Autocomplete
          sx={{ mt: 2 }}
          loading={loading}
          getOptionLabel={(option) => option.node.username || ""}
          filterOptions={(x) => x}
          options={options}
          loadingText="加载中"
          autoComplete
          includeInputInList
          noOptionsText="无"
          onChange={onChange}
          isOptionEqualToValue={(option, value) =>
            option.node.username === value.node.username
          }
          onInputChange={onInputChange}
          renderInput={(params) => (
            <TextField {...params} required size="small" label="用户" />
          )}
          renderOption={(props, option) => {
            return (
              <ListItem {...props}>
                <ListItemAvatar>
                  <Avatar src={option.node.avatarUrl || ""} />
                </ListItemAvatar>
                <ListItemText
                  primary={option.node.name}
                  secondary={`@${option.node.username}`}
                />
              </ListItem>
            );
          }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel size="small" required>
            角色
          </InputLabel>
          <Select
            fullWidth
            required
            label="角色"
            size="small"
            defaultValue={Access.Reporter}
            {...register("access")}
          >
            <MenuItem value={Access.Owner} disabled={!ge(access, Access.Owner)}>
              所有者
            </MenuItem>
            <MenuItem value={Access.Maintainer}>维护者</MenuItem>
            <MenuItem value={Access.Reporter}>报告者</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          添加
        </Button>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewDialog;
