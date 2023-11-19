import {
  CreateSshKeyInput,
  Maybe,
  SshKeyEdge,
  SshKeyUsage,
  useCreateSshKeyMutation,
} from "@/generated/types";
import dayjs, { Dayjs, tz } from "@/shared/dayts";
import { sshKey as pattern } from "@/utils/regex";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  fullPath: string;
  onClose: () => void;
}

function NewDialog(props: Props) {
  const { open, fullPath, onClose } = props;
  const [expiresAt, setExpiresAt] = useState<string | null>();
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<CreateSshKeyInput>({
    defaultValues: {
      usages: [SshKeyUsage.Read],
    },
  });
  const [createSshKeyMutation] = useCreateSshKeyMutation();

  const onChange = (value: Maybe<Dayjs>) => {
    const text = value?.tz(tz).format();
    setExpiresAt(text);
    setValue("expiresAt", text);
  };

  const onCreate = handleSubmit((input: CreateSshKeyInput) => {
    createSshKeyMutation({
      variables: { input },
      update(cache, { data: result }) {
        const sshKey = result?.payload?.sshKey;
        if (!sshKey) return;

        cache.modify({
          fields: {
            sshKeys(existingRefs = {}, { toReference, readField }) {
              if (
                existingRefs.edges?.some(
                  (edge: SshKeyEdge) => readField("id", edge.node) === sshKey.id
                )
              ) {
                return existingRefs;
              }

              return {
                ...existingRefs,
                edges: [
                  ...existingRefs.edges,
                  {
                    __typename: "SshKeyEdge",
                    node: toReference(sshKey),
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
      <DialogTitle>添加 SSH 公钥</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ display: "none" }}
          {...register("fullPath", { value: fullPath })}
        />
        <TextField
          error={Boolean(errors.title)}
          fullWidth
          helperText={errors.title?.message || pattern.title.helper}
          label="标题"
          margin="dense"
          required
          size="small"
          {...register("title", { ...pattern.title.rules })}
        />
        <TextField
          error={Boolean(errors.key)}
          fullWidth
          helperText={errors.key?.message || pattern.key.helper}
          label="SSH 公钥"
          margin="dense"
          multiline
          minRows={3}
          required
          size="small"
          placeholder="ssh-ed25519 AAA..."
          {...register("key", { ...pattern.key.rules })}
        />
        <DatePicker
          sx={{ my: 1 }}
          label="过期时间"
          minDate={dayjs()}
          slotProps={{
            actionBar: { actions: ["clear"] },
            textField: {
              size: "small",
              helperText: expiresAt || "永久有效",
            },
          }}
          onChange={onChange}
        />
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">用途</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox size="small" />}
              checked
              defaultChecked
              label="读"
              required
              title="必需包含读"
              value={SshKeyUsage.Read}
              {...register("usages")}
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="写"
              value={SshKeyUsage.Write}
              {...register("usages")}
            />
          </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
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
