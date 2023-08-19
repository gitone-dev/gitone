import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  SendPasswordResetEmailInput,
  useExistEmailLazyQuery,
  useSendPasswordResetEmailMutation,
} from "../../../generated/types";
import { user as pattern } from "../../../utils/regex";

function Form() {
  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<SendPasswordResetEmailInput>();
  const { enqueueSnackbar } = useSnackbar();
  const [existEmailLazyQuery] = useExistEmailLazyQuery();
  const [sendPasswordResetEmailMutation] = useSendPasswordResetEmailMutation();

  const validateEmail = (email: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      existEmailLazyQuery({
        variables: { email },
        onCompleted(data) {
          if (data.existEmail) {
            clearErrors("email");
            resolve(true);
          } else {
            setError("email", { message: "邮箱未注册" });
          }
        },
        onError(error) {
          setError("email", { message: error.message });
        },
      });
    });
  };

  const onSubmit = handleSubmit((input: SendPasswordResetEmailInput) => {
    sendPasswordResetEmailMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("邮件已发送", { variant: "success" });
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
          pattern: pattern.email.pattern,
          required: true,
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

export default Form;
