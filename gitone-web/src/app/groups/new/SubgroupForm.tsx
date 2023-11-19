import {
  CreateGroupInput,
  Group,
  GroupEdge,
  GroupFilter,
  Maybe,
  Visibility,
  useCreateGroupMutation,
  useExistFullPathLazyQuery,
  useGroupsLazyQuery,
  useViewerQuery,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import VisibilityIcon from "@/shared/VisibilityIcon";
import { group as pattern } from "@/utils/regex";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import debounce from "@mui/material/utils/debounce";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  group: Group;
}

function SubgroupForm(props: Props) {
  const { group } = props;
  const groupEdge: GroupEdge = { node: group, cursor: group.id };
  const [parent, setParent] = useState(group);
  const [options, setOptions] = useState<GroupEdge[]>([groupEdge]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<CreateGroupInput>({
    mode: "onBlur",
    defaultValues: { parentId: groupEdge.node.id },
  });
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const [existFullPathQuery] = useExistFullPathLazyQuery();
  const [createGroupMutation] = useCreateGroupMutation();
  const [groupsLazyQuery, { loading }] = useGroupsLazyQuery({
    fetchPolicy: "network-only",
  });

  const validatePath = async (path: string): Promise<boolean> => {
    const fullPath = `${parent}/${path}`;
    const { data } = await existFullPathQuery({
      variables: { fullPath },
      onCompleted(data) {
        if (data.existFullPath) {
          setError("path", { message: "路径已被占用" });
        } else {
          clearErrors("path");
        }
      },
      onError(error) {
        setError("path", { message: error.message });
      },
    });
    return !data?.existFullPath;
  };

  const groupsQuery = useMemo(
    () =>
      debounce((query: string) => {
        const filterBy: GroupFilter = {
          query,
          username: viewer?.username,
          recursive: true,
        };
        groupsLazyQuery({
          variables: { first: 20, filterBy },
          onCompleted(data) {
            setOptions(data.groups?.edges || []);
          },
        });
      }, 500),
    [viewer, groupsLazyQuery]
  );
  const onChange = (_event: unknown, edge: Maybe<GroupEdge>) => {
    if (!edge) return;

    setValue("parentId", edge.node.id);
    setParent(edge.node);
  };
  const onInputChange = (_event: unknown, value: string) => {
    groupsQuery(value);
  };

  const onSubmit = handleSubmit((input: CreateGroupInput) => {
    createGroupMutation({
      variables: { input },
      onCompleted({ payload }) {
        enqueueSnackbar("创建成功", { variant: "success" });
        navigate(`/${payload?.group?.fullPath}`);
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="新建组织" component="form" onSubmit={onSubmit}>
      <TextField
        error={Boolean(errors.name)}
        fullWidth
        helperText={errors.name?.message || pattern.name.helper}
        label="名称"
        margin="dense"
        required
        size="small"
        {...register("name", { ...pattern.name.rules })}
      />
      <Stack direction="row" spacing={1}>
        <Autocomplete
          defaultValue={groupEdge}
          fullWidth
          sx={{ mt: 2 }}
          loading={loading}
          getOptionLabel={(option) => option.node.fullPath || ""}
          filterOptions={(x) => x}
          options={options}
          loadingText="加载中"
          autoComplete
          includeInputInList
          noOptionsText="无"
          onChange={onChange}
          isOptionEqualToValue={(option, value) =>
            option.node.fullPath === value.node.fullPath
          }
          onInputChange={onInputChange}
          renderInput={(params) => (
            <TextField {...params} required size="small" label="上级组织" />
          )}
          renderOption={(props, option) => {
            return (
              <ListItem {...props}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <span>{option.node.fullName}</span>
                      <VisibilityIcon visibility={option.node.visibility} />
                    </>
                  }
                  secondary={option.node.fullPath}
                />
              </ListItem>
            );
          }}
        />
        <TextField
          error={Boolean(errors.path)}
          fullWidth
          helperText={errors.path?.message || pattern.path.helper}
          label="路径"
          margin="dense"
          required
          size="small"
          {...register("path", {
            ...pattern.path.rules,
            validate: validatePath,
          })}
        />
      </Stack>
      <TextField
        error={Boolean(errors.description)}
        fullWidth
        helperText={errors.description?.message || pattern.description.helper}
        label="组织简介"
        multiline
        minRows={3}
        {...register("description", { ...pattern.description.rules })}
      />
      <FormControl fullWidth>
        <FormLabel>可见性</FormLabel>
        <RadioGroup row defaultValue={Visibility.Private}>
          <FormControlLabel
            value={Visibility.Private}
            control={<Radio />}
            label="私有"
            {...register("visibility")}
          />
          <FormControlLabel
            disabled={parent.visibility === Visibility.Private}
            value={Visibility.Public}
            control={<Radio />}
            label="公开"
            {...register("visibility")}
          />
        </RadioGroup>
        <FormHelperText>{pattern.visibility.helper}</FormHelperText>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || isSubmitting}
      >
        创建
      </Button>
    </ChunkPaper>
  );
}

export default SubgroupForm;
