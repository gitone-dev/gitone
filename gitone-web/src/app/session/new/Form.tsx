import { LoginInput, login } from "@/client";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Form() {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginInput>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = handleSubmit((input: LoginInput) => {
    login(input)
      .then((data) => {
        enqueueSnackbar(data || "登录成功", { variant: "success" });
        navigate("/", { replace: true });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
    // TODO 未激活状态
    //   onCompleted({ payload }) {
    //     const session = payload?.session;
    //     if (session?.active) {
    //       enqueueSnackbar("登录成功", { variant: "success" });
    //       navigate("/", { replace: true });
    //     } else {
    //       enqueueSnackbar("帐号未激活", { variant: "error" });
    //       navigate("/users/unactivate", {
    //         replace: true,
    //         state: {
    //           email: session?.email,
    //           username: session?.username,
    //         },
    //       });
    //     }
    //   },
    //   onError(error) {
    //     enqueueSnackbar(error.message, { variant: "error" });
    //   },
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        fullWidth
        label="用户名"
        margin="dense"
        placeholder="gitone"
        required
        size="small"
        {...register("username", { required: true })}
      />
      <TextField
        fullWidth
        label="密码"
        margin="dense"
        required
        type="password"
        placeholder="123456"
        size="small"
        helperText={
          <Link
            component={RouterLink}
            to="/users/forget-password"
            underline="none"
          >
            忘记密码？
          </Link>
        }
        {...register("password", { required: true })}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Button
          disabled={isSubmitting}
          startIcon={<LockOpenOutlinedIcon />}
          type="submit"
          variant="contained"
        >
          登录
        </Button>
        <Button component={RouterLink} to="/users/new">
          注册
        </Button>
      </Stack>
    </Box>
  );
}

export default Form;
