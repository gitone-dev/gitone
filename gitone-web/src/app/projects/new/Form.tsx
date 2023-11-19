import {
  CreateProjectInput,
  Maybe,
  Namespace,
  NamespaceEdge,
  NamespaceFilter,
  NamespaceType,
  Visibility,
  useCreateProjectMutation,
  useExistFullPathLazyQuery,
  useNamespacesLazyQuery,
  useViewerQuery,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import VisibilityIcon from "@/shared/VisibilityIcon";
import { project as pattern } from "@/utils/regex";
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
  namespace: Namespace;
}

function Form(props: Props) {
  const { namespace } = props;
  const namespaceEdge: NamespaceEdge = {
    node: namespace,
    cursor: namespace.id,
  };
  const [options, setOptions] = useState<NamespaceEdge[]>([namespaceEdge]);
  const [parent, setParent] = useState(namespace);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<CreateProjectInput>({
    mode: "onBlur",
    defaultValues: { parentId: namespace.id },
  });
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const [existFullPathQuery] = useExistFullPathLazyQuery();
  const [createProjectMutation] = useCreateProjectMutation();
  const [namespacesLazyQuery, { loading }] = useNamespacesLazyQuery({
    fetchPolicy: "network-only",
  });

  const validatePath = async (path: string): Promise<boolean> => {
    const fullPath = `${parent.fullPath}/${path}`;
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

  const namespacesQuery = useMemo(
    () =>
      debounce((query: string) => {
        const filterBy: NamespaceFilter = {
          query,
          username: viewer?.username || "",
          recursive: true,
          types: [NamespaceType.User, NamespaceType.Group],
        };
        namespacesLazyQuery({
          variables: { first: 20, filterBy },
          onCompleted(data) {
            setOptions(data.namespaces?.edges || []);
          },
        });
      }, 500),
    [viewer, namespacesLazyQuery]
  );

  const onChange = (_event: unknown, edge: Maybe<NamespaceEdge>) => {
    if (!edge) return;

    setValue("parentId", edge.node.id);
    setParent(edge.node);
  };

  const onInputChange = (_event: unknown, value: string) => {
    namespacesQuery(value);
  };

  const onSubmit = handleSubmit((input: CreateProjectInput) => {
    createProjectMutation({
      variables: { input },
      onCompleted({ payload }) {
        enqueueSnackbar("创建成功", { variant: "success" });
        navigate(`/${payload?.project?.fullPath}`);
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="新建项目" component="form" onSubmit={onSubmit}>
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
          defaultValue={namespaceEdge}
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
            <TextField {...params} required size="small" label="上级" />
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
        label="项目简介"
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

export default Form;
