import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  CreateUserInput,
  useCreateUserMutation,
  useExistEmailLazyQuery,
  useExistFullPathLazyQuery,
} from "../../../generated/types";
import { user as pattern } from "../../../utils/regex";

function Form() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<CreateUserInput>({ mode: "onBlur" });
  const [existEmailLazyQuery] = useExistEmailLazyQuery();
  const [existFullPathQuery] = useExistFullPathLazyQuery();
  const [createUserMutation] = useCreateUserMutation();

  const validateEmail = (email: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      existEmailLazyQuery({
        variables: { email },
        onCompleted(data) {
          if (data.existEmail) {
            setError("email", { message: "邮箱已被占用" });
          } else {
            clearErrors("email");
            resolve(true);
          }
        },
        onError(error) {
          setError("email", { message: error.message });
        },
      });
    });
  };

  const validateUsername = (username: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      existFullPathQuery({
        variables: { fullPath: username },
        onCompleted(data) {
          if (data.existFullPath) {
            setError("username", { message: "用户名已被占用" });
          } else {
            clearErrors("username");
            resolve(true);
          }
        },
        onError(error) {
          setError("username", { message: error.message });
        },
      });
    });
  };

  const onSubmit = handleSubmit((input: CreateUserInput) => {
    createUserMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("注册成功", { variant: "success" });
        navigate("/users/sent", {
          replace: true,
          state: {
            email: input.email,
            message: "激活",
          },
        });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        error={Boolean(errors.email)}
        fullWidth
        helperText={errors.email?.message || pattern.email.helper}
        label="邮箱"
        margin="dense"
        required
        size="small"
        type="email"
        {...register("email", {
          ...pattern.email.rules,
          validate: validateEmail,
        })}
      />
      <TextField
        error={Boolean(errors.name)}
        fullWidth
        helperText={errors.name?.message || pattern.name.helper}
        label="昵称"
        margin="dense"
        required
        size="small"
        {...register("name", { ...pattern.name.rules })}
      />
      <TextField
        error={Boolean(errors.username)}
        fullWidth
        helperText={errors.username?.message || pattern.username.helper}
        label="用户名"
        margin="dense"
        required
        size="small"
        {...register("username", {
          ...pattern.username.rules,
          validate: validateUsername,
        })}
      />
      <TextField
        error={Boolean(errors.password)}
        fullWidth
        helperText={errors.password?.message || pattern.password.helper}
        label="密码"
        margin="dense"
        required
        type="password"
        size="small"
        {...register("password", { ...pattern.password.rules })}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
        >
          注册
        </Button>
        <Button component={RouterLink} to="/session/new">
          登录
        </Button>
      </Stack>
    </Box>
  );
}

export default Form;
