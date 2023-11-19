import {
  UpdatePathInput,
  useExistFullPathLazyQuery,
  useUpdatePathMutation,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import { group as pattern } from "@/utils/regex";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  primary: string;
  fullPath: string;
  path: string;
}

function UpdatePathPaper(props: Props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isDirty },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdatePathInput>({ mode: "onBlur" });
  const [updateGroupPathMutation] = useUpdatePathMutation();
  const [existFullPathQuery] = useExistFullPathLazyQuery();

  const validatePath = async (fullPath: string): Promise<boolean> => {
    if (props.fullPath == fullPath) return true;

    const { data } = await existFullPathQuery({
      variables: { fullPath },
      onError(error) {
        setError("path", { message: error.message });
      },
      onCompleted(data) {
        if (data.existFullPath) {
          setError("path", { message: "路径已被占用" });
        } else {
          clearErrors("path");
        }
      },
    });
    return !data?.existFullPath;
  };

  const onSubmit = handleSubmit((input: UpdatePathInput) => {
    updateGroupPathMutation({
      variables: { input },
      onCompleted({ payload }) {
        enqueueSnackbar("更新成功", { variant: "success" });
        navigate(`/${payload?.namespace?.fullPath}`);
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary={props.primary} component="form" onSubmit={onSubmit}>
      <TextField
        sx={{ display: "none" }}
        {...register("fullPath", { value: props.fullPath || "" })}
      />
      <TextField
        error={Boolean(errors.path)}
        fullWidth
        helperText={errors.path?.message || pattern.path.helper}
        label={props.primary}
        margin="dense"
        required
        size="small"
        {...register("path", {
          ...pattern.path.rules,
          validate: validatePath,
          value: props.path,
        })}
      />
      <Button type="submit" variant="contained" disabled={!isDirty}>
        保存
      </Button>
    </ChunkPaper>
  );
}

export default UpdatePathPaper;
