import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  UpdatePasswordInput,
  useUpdatePasswordMutation,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import { user as pattern } from "../../../utils/regex";

function Password() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    getValues,
    register,
    reset,
    setError,
  } = useForm<UpdatePasswordInput>({ mode: "onBlur" });
  const [updatePasswordMutation] = useUpdatePasswordMutation();

  const validatePassword = (): boolean => {
    const password = getValues("password");
    const passwordConfirmation = getValues("passwordConfirmation");

    if (password && passwordConfirmation && passwordConfirmation !== password) {
      setError("password", { message: "密码不一致" });
      setError("passwordConfirmation", { message: "密码不一致" });
      return false;
    }
    clearErrors("password");
    clearErrors("passwordConfirmation");
    return true;
  };

  const onSubmit = handleSubmit((input: UpdatePasswordInput) => {
    updatePasswordMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("密码已修改", { variant: "success" });
        reset();
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <>
      <ChunkPaper primary="修改密码" component="form" onSubmit={onSubmit}>
        <TextField
          error={Boolean(errors.oldPassword)}
          fullWidth
          helperText={errors.oldPassword?.message || pattern.password.helper}
          label="旧密码"
          margin="dense"
          required
          type="password"
          size="small"
          {...register("oldPassword", { ...pattern.password.rules })}
        />
        <TextField
          error={Boolean(errors.password)}
          fullWidth
          helperText={errors.password?.message || pattern.password.helper}
          label="新密码"
          margin="dense"
          required
          type="password"
          size="small"
          {...register("password", {
            ...pattern.password.rules,
            validate: validatePassword,
          })}
        />
        <TextField
          error={Boolean(errors.passwordConfirmation)}
          fullWidth
          helperText={errors.password?.message || pattern.password.helper}
          label="新密码确认"
          margin="dense"
          required
          type="password"
          size="small"
          {...register("passwordConfirmation", {
            ...pattern.password.rules,
            validate: validatePassword,
          })}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
        >
          提交
        </Button>
      </ChunkPaper>
    </>
  );
}

export default Password;
