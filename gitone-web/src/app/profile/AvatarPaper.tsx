import ChunkPaper from "@/shared/ChunkPaper";
import styled from "@emotion/styled";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateAvatarInput {
  files: FileList;
}

const Input = styled("input")({
  display: "none",
});

interface Props {
  avatarUrl?: string | null;
}

function AvatarPaper(props: Props) {
  const { avatarUrl } = props;
  const [avatar, setAvatar] = useState(avatarUrl || "");
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateAvatarInput>({ mode: "onChange" });

  const onOpen = () => setOpen(true);

  const onClose = () => {
    setPreview(null);
    reset();
    setOpen(false);
  };

  const validateAvatar = (value: FileList): string | undefined => {
    if (value.length !== 1) return "请选择一张图片";

    const file = value[0];
    if (!file.type.startsWith("image/")) return "请选择图片文件";
    if (file.size > 2 * 1024 * 1024) return "图片文件大小超过 2MB";

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const onSubmit = handleSubmit((data: CreateAvatarInput) => {
    const headers = new Headers();
    const token = localStorage.getItem("X-Auth-Token");
    if (token) {
      headers.append("X-Auth-Token", token);
    }
    const formData = new FormData();
    formData.append("file", data.files[0]);
    fetch("/avatars/u", {
      method: "POST",
      headers: headers,
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        enqueueSnackbar("头像修改成功", { variant: "success" });
        reset();
        setOpen(false);
        setAvatar(avatar + "?now=" + Date.now());
      })
      .catch((error: Error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  });

  return (
    <ChunkPaper primary="头像">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ height: 120, width: 120 }} src={avatar} />
        <IconButton size="small" onClick={onOpen}>
          <EditOutlinedIcon />
        </IconButton>
      </Stack>
      <Dialog
        component="form"
        open={open}
        onClose={onClose}
        onSubmit={onSubmit}
      >
        <DialogTitle>修改头像</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{ height: 200, width: 200 }}
              src={preview?.toString() || avatar}
            />
            <label htmlFor="upload-avatar">
              <Input
                accept="images/*"
                id="upload-avatar"
                type="file"
                {...register("files", { validate: validateAvatar })}
              />
              <IconButton color="primary" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Stack>
          <FormHelperText error={Boolean(errors.files)}>
            {errors.files?.message || "支持 2MB 以内的 PNG、JPEG 格式图片"}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            修改
          </Button>
          <Button onClick={onClose}>取消</Button>
        </DialogActions>
      </Dialog>
    </ChunkPaper>
  );
}

export default AvatarPaper;
