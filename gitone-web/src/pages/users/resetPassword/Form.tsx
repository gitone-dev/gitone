import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  ResetPasswordInput,
  useResetPasswordMutation,
} from "../../../generated/types";
import { user as pattern } from "../../../utils/regex";

interface Props {
  token: string;
}

function Form(props: Props) {
  const { token } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<ResetPasswordInput>();
  const [resetPasswordMutation] = useResetPasswordMutation();

  const onSubmit = handleSubmit((input: ResetPasswordInput) => {
    resetPasswordMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("密码已修改，请重新登录", { variant: "success" });
        navigate("/session/new");
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        sx={{ display: "none" }}
        {...register("token", { value: token })}
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
          pattern: pattern.password.pattern,
          required: true,
        })}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || isSubmitting}
      >
        提交
      </Button>
    </Box>
  );
}

export default Form;
