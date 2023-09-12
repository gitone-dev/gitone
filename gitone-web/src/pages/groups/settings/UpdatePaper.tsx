import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  Group,
  UpdateGroupInput,
  useUpdateGroupMutation,
} from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";
import { group as pattern } from "../../../utils/regex";

interface Props {
  group: Group;
}

function UpdatePaper(props: Props) {
  const { group } = props;

  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<UpdateGroupInput>({
    mode: "onBlur",
  });
  const [updateGroupMutation] = useUpdateGroupMutation();

  const onSubmit = handleSubmit((input: UpdateGroupInput) => {
    updateGroupMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("更新成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <ChunkPaper primary="组织信息" component="form" onSubmit={onSubmit}>
      <Stack direction="row" spacing={1} alignItems="baseline">
        <TextField
          error={Boolean(errors.name)}
          fullWidth
          helperText={errors.name?.message || pattern.name.helper}
          label="名称"
          margin="dense"
          required
          size="small"
          {...register("name", {
            ...pattern.name.rules,
            value: group.name || "",
          })}
        />
        <TextField
          disabled
          error={Boolean(errors.id)}
          fullWidth
          label="ID"
          margin="dense"
          required
          size="small"
          {...register("id", { required: true, value: group.id })}
        />
      </Stack>
      <TextField
        error={Boolean(errors.description)}
        fullWidth
        helperText={errors.description?.message || pattern.description.helper}
        multiline
        rows={3}
        label="描述"
        margin="dense"
        required
        size="small"
        {...register("description", {
          ...pattern.description.rules,
          value: group.description || "",
        })}
      />
      <Button type="submit" variant="contained" disabled={!isDirty}>
        保存
      </Button>
    </ChunkPaper>
  );
}

export default UpdatePaper;
