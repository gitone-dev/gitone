import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import {
  CreateEmailInput,
  useExistEmailLazyQuery,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import { user as pattern } from "../../../utils/regex";

interface Props {
  onCreate: (input: CreateEmailInput) => void;
}

function AddEmailPaper(props: Props) {
  const { onCreate } = props;
  const {
    clearErrors,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<CreateEmailInput>();
  const [existEmailLazyQuery] = useExistEmailLazyQuery();

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

  const onSubmit = handleSubmit((input: CreateEmailInput) => {
    onCreate(input);
    reset();
  });

  return (
    <ChunkPaper primary="添加邮箱" component="form" onSubmit={onSubmit}>
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
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || isSubmitting}
      >
        添加
      </Button>
    </ChunkPaper>
  );
}

export default AddEmailPaper;
