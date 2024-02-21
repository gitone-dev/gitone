import {
  Maybe,
  SshKey,
  SshKeyUsage,
  UpdateSshKeyInput,
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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  sshKey: SshKey;
  open: boolean;
  onClose: () => void;
  onUpdate: (input: UpdateSshKeyInput) => void;
}

export default function EditDialog(props: Props) {
  const { sshKey, open } = props;
  const [expiresAt, setExpiresAt] = useState<string | undefined>(
    sshKey.expiresAt
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<UpdateSshKeyInput>({
    defaultValues: {
      id: sshKey.id,
      title: sshKey.title || "",
      usages: sshKey.usages || [SshKeyUsage.Read],
      expiresAt: sshKey.expiresAt,
    },
  });

  const onClose = () => {
    props.onClose();
    setExpiresAt(sshKey.expiresAt);
    reset();
  };

  const onSubmit = handleSubmit((input: UpdateSshKeyInput) => {
    props.onUpdate(input);
    props.onClose();
  });

  const onChange = (value: Maybe<Dayjs>) => {
    const text = value?.tz(tz).format();
    setExpiresAt(text);
    setValue("expiresAt", text);
  };

  return (
    <Dialog
      component="form"
      fullWidth
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <DialogTitle>编辑 SSH 公钥</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ display: "none" }}
          {...register("id", { value: sshKey.id })}
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
          disabled
          fullWidth
          label="指纹"
          margin="dense"
          rows={5}
          size="small"
          value={sshKey.fingerprint}
        />
        <TextField
          disabled
          fullWidth
          label="SSH 公钥"
          margin="dense"
          multiline
          rows={5}
          size="small"
          value={sshKey.key}
        />
        <DatePicker
          sx={{ my: 1 }}
          label="过期时间"
          minDate={dayjs()}
          value={expiresAt ? dayjs(expiresAt) : null}
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
            <Controller
              control={control}
              name="usages"
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  checked={field.value.includes(SshKeyUsage.Write)}
                  control={<Checkbox size="small" />}
                  label="写"
                  value={SshKeyUsage.Write}
                  {...register("usages")}
                />
              )}
            />
          </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
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
