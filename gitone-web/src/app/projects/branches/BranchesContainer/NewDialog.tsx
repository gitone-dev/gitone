import {
  BranchEdge,
  CreateBranchInput,
  useCreateBranchMutation,
} from "@/generated/types";
import { branch as pattern } from "@/utils/regex";
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

export default function NewDialog(props: Props) {
  const { open, fullPath, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateBranchInput>();
  const [createBranchMutation] = useCreateBranchMutation();

  const onCreate = handleSubmit((input: CreateBranchInput) => {
    createBranchMutation({
      variables: { input },
      update(cache, { data: result }) {
        const { branch, repositoryId } = result?.payload || {};
        if (!branch || !repositoryId) return;

        cache.modify({
          id: cache.identify({ __typename: "Repository", id: repositoryId }),
          fields: {
            branches(existingRefs = {}, { readField, toReference }) {
              if (
                existingRefs.edges?.some(
                  (edge: BranchEdge) => readField("id", edge.node) === branch.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "BranchEdge",
                    node: toReference(branch),
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
      <DialogTitle>新建分支</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ display: "none" }}
          {...register("fullPath", { value: fullPath })}
        />
        <TextField
          error={Boolean(errors.name)}
          fullWidth
          helperText={errors.name?.message || pattern.name.helper}
          label="分支名"
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
