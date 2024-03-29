import {
  SendPasswordResetEmailInput,
  useExistEmailLazyQuery,
  useSendPasswordResetEmailMutation,
} from "@/generated/types";
import { user as pattern } from "@/utils/regex";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<SendPasswordResetEmailInput>({ mode: "onBlur" });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [existEmailLazyQuery] = useExistEmailLazyQuery();
  const [sendPasswordResetEmailMutation] = useSendPasswordResetEmailMutation();

  const validateEmail = async (email: string): Promise<boolean> => {
    const { data } = await existEmailLazyQuery({
      variables: { email },
      onCompleted(data) {
        if (data.existEmail) {
          clearErrors("email");
        } else {
          setError("email", { message: "邮箱未注册" });
        }
      },
      onError(error) {
        setError("email", { message: error.message });
      },
    });
    return !!data?.existEmail;
  };

  const onSubmit = handleSubmit((input: SendPasswordResetEmailInput) => {
    sendPasswordResetEmailMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("邮件已发送", { variant: "success" });
        navigate("/users/sent", {
          replace: true,
          state: { email: input.email, message: "密码重置" },
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
