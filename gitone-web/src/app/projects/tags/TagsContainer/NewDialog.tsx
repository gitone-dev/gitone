import {
  CreateTagInput,
  TagEdge,
  useCreateTagMutation,
} from "@/generated/types";
import { tag as pattern } from "@/utils/regex";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  fullPath: string;
  onClose: () => void;
}

function NewDialog(props: Props) {
  const { open, fullPath, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateTagInput>();
  const [createTagMutation] = useCreateTagMutation();

  const onCreate = handleSubmit((input: CreateTagInput) => {
    createTagMutation({
      variables: { input },
      update(cache, { data: result }) {
        const { tag, repositoryId } = result?.payload || {};
        if (!tag || !repositoryId) return;

        cache.modify({
          id: cache.identify({ __typename: "Repository", id: repositoryId }),
          fields: {
            tags(existingRefs = {}, { readField, toReference }) {
              if (
                existingRefs.edges?.some(
                  (edge: TagEdge) => readField("id", edge.node) === tag.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "TagEdge",
                    node: toReference(tag),
                  },
                ],
              };
            },
          },
        });
      },
      onCompleted() {
        enqueueSnackbar("添加成功", { variant: "success" });
        onClose();
        reset();
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  });

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={onCreate}
    >
      <DialogTitle>新建标签</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ display: "none" }}
          {...register("fullPath", { value: fullPath })}
        />
        <TextField
          error={Boolean(errors.name)}
          fullWidth
          helperText={errors.name?.message || pattern.name.helper}
          label="标签名"
          margin="dense"
          required
          size="small"
          {...register("name", { ...pattern.name.rules })}
        />
        <TextField
          error={Boolean(errors.revision)}
          fullWidth
          helperText={errors.revision?.message || pattern.revision.helper}
          label="目标"
          margin="dense"
          required
          size="small"
          {...register("revision", { ...pattern.revision.rules })}
        />
        <TextField
          error={Boolean(errors.message)}
          fullWidth
          helperText={errors.message?.message || pattern.message.helper}
          label="描述"
          multiline
          minRows={3}
          margin="dense"
          size="small"
          {...register("message", { ...pattern.message.rules })}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          添加
        </Button>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewDialog;
