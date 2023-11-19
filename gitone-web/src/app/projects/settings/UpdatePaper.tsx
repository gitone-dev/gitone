import {
  Project,
  UpdateProjectInput,
  useUpdateProjectMutation,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import { project as pattern } from "@/utils/regex";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";

interface Props {
  project: Project;
}

function UpdatePaper(props: Props) {
  const { project } = props;

  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<UpdateProjectInput>({
    mode: "onBlur",
  });
  const [updateProjectMutation] = useUpdateProjectMutation();

  const onSubmit = handleSubmit((input: UpdateProjectInput) => {
    updateProjectMutation({
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
    <ChunkPaper primary="项目信息" component="form" onSubmit={onSubmit}>
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
            value: project.name || "",
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
          {...register("id", { required: true, value: project.id })}
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
          value: project.description || "",
        })}
      />
      <Button type="submit" variant="contained" disabled={!isDirty}>
        保存
      </Button>
    </ChunkPaper>
  );
}

export default UpdatePaper;
