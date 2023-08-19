import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  UpdateActivationEmailInput,
  useExistEmailLazyQuery,
  useUpdateActivationEmailMutation,
} from "../../../generated/types";
import { user as pattern } from "../../../utils/regex";

interface Props {
  email: string;
  open: boolean;
  onClose: () => void;
}

function UpdateActivationEmailDialog(props: Props) {
  const { email, open, onClose } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<UpdateActivationEmailInput>({ mode: "onBlur" });
  const [existEmailLazyQuery] = useExistEmailLazyQuery();
  const [updateActivationEmailMutation] = useUpdateActivationEmailMutation();

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

  const onSubmit = handleSubmit((input: UpdateActivationEmailInput) => {
    updateActivationEmailMutation({
      variables: { input },
      onCompleted() {
        onClose();
        enqueueSnackbar("邮箱修改成功", { variant: "success" });
        navigate("/users/sent", {
          replace: true,
          state: { email: input.email, message: "激活" },
        });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <Dialog component="form" open={open} onClose={onClose} onSubmit={onSubmit}>
      <DialogTitle>更改邮箱</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          fullWidth
          label="旧邮箱"
          margin="dense"
          size="small"
          type="email"
          value={email}
        />
        <TextField
          error={Boolean(errors.email)}
          fullWidth
          helperText={errors.email?.message || pattern.email.helper}
          label="新邮箱"
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
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
        >
          修改
        </Button>
        <Button onClick={onClose}>取消</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateActivationEmailDialog;
