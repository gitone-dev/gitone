import {
  EmailConnection,
  SetPrimaryEmailInput,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

interface Props {
  emails: EmailConnection;
  onSetPrimary: (input: SetPrimaryEmailInput) => void;
}

function SetPrimaryEmailPaper(props: Props) {
  const { emails, onSetPrimary } = props;
  const primaryEdge = emails.edges?.find((edge) => edge.node.primary);
  const {
    formState: { isDirty, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SetPrimaryEmailInput>();

  const onSubmit = handleSubmit((input: SetPrimaryEmailInput) => {
    onSetPrimary(input);
  });

  return (
    <ChunkPaper primary="设置主邮箱" component="form" onSubmit={onSubmit}>
      <TextField
        defaultValue={primaryEdge?.node.email}
        fullWidth
        helperText="选择一个邮箱做为主邮箱"
        label="主邮箱"
        margin="dense"
        required
        select
        size="small"
        {...register("email")}
      >
        {emails.edges?.map((edge) => (
          <MenuItem key={edge.cursor} value={edge.node.email}>
            {edge.node.email}
          </MenuItem>
        ))}
      </TextField>
      <Button
        disabled={!isDirty || isSubmitting}
        type="submit"
        variant="contained"
      >
        保存
      </Button>
    </ChunkPaper>
  );
}

export default SetPrimaryEmailPaper;
