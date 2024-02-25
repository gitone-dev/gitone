import {
  UpdateUserInput,
  User,
  useUpdateUserMutation,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import { user as pattern } from "@/utils/regex";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

interface Props {
  viewer: User;
}

export default function Form(props: Props) {
  const { viewer } = props;
  const { enqueueSnackbar } = useSnackbar();

  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateUserInput>({ mode: "onBlur" });
  const [updateNameMutation] = useUpdateUserMutation();

  const onSubmit = handleSubmit((input: UpdateUserInput) => {
    updateNameMutation({
      variables: { input },
      onCompleted() {
        enqueueSnackbar("修改成功", { variant: "success" });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });
  return (
    <ChunkPaper primary="修改个人资料" component="form" onSubmit={onSubmit}>
      <Stack direction="row" spacing={1} alignItems="baseline">
        <TextField
          defaultValue={viewer.name}
          error={Boolean(errors.name)}
          fullWidth
          helperText={errors.name?.message || pattern.name.helper}
          label="昵称"
          margin="dense"
          required
          size="small"
          {...register("name", { ...pattern.name.rules })}
        />
        <TextField
          defaultValue={viewer.id}
          disabled
          fullWidth
          label="用户 ID"
          margin="dense"
          size="small"
        />
      </Stack>
      <TextField
        defaultValue={viewer.description}
        error={Boolean(errors.description)}
        fullWidth
        helperText={errors.description?.message || pattern.bio.helper}
        margin="dense"
        label="个人简介"
        multiline
        minRows={3}
        {...register("description", { ...pattern.bio.rules })}
      />
      <TextField
        defaultValue={viewer.location}
        error={Boolean(errors.location)}
        fullWidth
        helperText={errors.location?.message || pattern.location.helper}
        label="地区"
        margin="dense"
        size="small"
        {...register("location", { ...pattern.location.rules })}
      />
      <TextField
        defaultValue={viewer.websiteUrl}
        error={Boolean(errors.websiteUrl)}
        fullWidth
        helperText={errors.websiteUrl?.message || pattern.websiteUrl.helper}
        label="网站链接"
        margin="dense"
        size="small"
        {...register("websiteUrl", { ...pattern.websiteUrl.rules })}
      />
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
