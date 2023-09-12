import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  UpdateUsernameInput,
  useUpdateUsernameMutation,
  useViewerQuery,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import { user as pattern } from "../../../utils/regex";

function Account() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateUsernameInput>({ mode: "onBlur" });

  const { data, loading, error } = useViewerQuery();
  const [updateUsernameMutation] = useUpdateUsernameMutation();

  const onSubmit = handleSubmit((input: UpdateUsernameInput) => {
    updateUsernameMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("修改成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!data?.viewer) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <>
      <ChunkPaper primary="修改用户名" component="form" onSubmit={onSubmit}>
        <TextField
          error={Boolean(errors.username)}
          fullWidth
          helperText={errors.username?.message || pattern.username.helper}
          label="用户名"
          margin="dense"
          size="small"
          defaultValue={data?.viewer.username}
          {...register("username", { ...pattern.username.rules })}
        />
        <Button
          disabled={!isDirty || isSubmitting}
          type="submit"
          variant="contained"
        >
          保存
        </Button>
      </ChunkPaper>
    </>
  );
}

export default Account;
