import {
  CreateEmailInput,
  useExistEmailLazyQuery,
} from "@/generated/types";
import { user as pattern } from "@/utils/regex";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateEmailInput) => void;
}

export default function CreateEmailDialog(props: Props) {
  const { open, onClose, onCreate } = props;

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<CreateEmailInput>();
  const [existEmailLazyQuery] = useExistEmailLazyQuery();

  const validateEmail = async (email: string): Promise<boolean> => {
    const { data } = await existEmailLazyQuery({
      variables: { email },
      onCompleted(data) {
        if (data.existEmail) {
          setError("email", { message: "邮箱已被占用" });
        } else {
          clearErrors("email");
        }
      },
      onError(error) {
        setError("email", { message: error.message });
      },
    });
    return !data?.existEmail;
  };

  const onSubmit = handleSubmit((input: CreateEmailInput) => {
    onCreate(input);
    onClose();
  });

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={onSubmit}
    >
      <DialogTitle>添加邮箱</DialogTitle>
      <DialogContent>
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
            ...pattern.email.rules,
            validate: validateEmail,
          })}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          提交
        </Button>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
}
