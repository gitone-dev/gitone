import {
  CreateGroupInput,
  Visibility,
  useCreateGroupMutation,
  useExistFullPathLazyQuery,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import { group as pattern } from "@/utils/regex";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function GroupForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<CreateGroupInput>({ mode: "onBlur" });
  const [existFullPathQuery] = useExistFullPathLazyQuery();
  const [createGroupMutation] = useCreateGroupMutation();

  const validatePath = async (username: string): Promise<boolean> => {
    const { data } = await existFullPathQuery({
      variables: { fullPath: username },
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
        提交
      </Button>
    </ChunkPaper>
  );
}

