import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Group,
  UpdateGroupPathInput,
  useExistFullPathLazyQuery,
  useUpdateGroupPathMutation,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import { group as pattern } from "../../../utils/regex";

interface Props {
  group: Group;
}

function UpdatePathPaper(props: Props) {
  const { group } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isDirty },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdateGroupPathInput>({ mode: "onBlur" });
  const [updateGroupPathMutation] = useUpdateGroupPathMutation();
  const [existFullPathQuery] = useExistFullPathLazyQuery();

  const validatePath = async (fullPath: string): Promise<boolean> => {
    if (fullPath == group.fullPath) return true;

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

  const onSubmit = handleSubmit((input: UpdateGroupPathInput) => {
    updateGroupPathMutation({
      variables: { input },
      onCompleted({ payload }) {
        enqueueSnackbar("更新成功", { variant: "success" });
        navigate(`/${payload?.group?.fullPath}`);
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="路径" component="form" onSubmit={onSubmit}>
      <TextField
        sx={{ display: "none" }}
        {...register("id", { value: group.id })}
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
          value: group.path || "",
        })}
      />
      <Button type="submit" variant="contained" disabled={!isDirty}>
        保存
      </Button>
    </ChunkPaper>
  );
}

export default UpdatePathPaper;
