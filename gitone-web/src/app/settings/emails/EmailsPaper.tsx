import {
  CreateEmailInput,
  DeleteEmailInput,
  EmailConnection,
} from "@/generated/types";
import ChunkPaper from "@/shared/ChunkPaper";
import Button from "@mui/material/Button";
import { useState } from "react";
import CreateEmailDialog from "./CreateEmailDialog";
import ListEmail from "./ListEmail";

interface Props {
  emails: EmailConnection;
  unconfirmedEmails: EmailConnection;
  onCreate: (input: CreateEmailInput) => void;
  onDelete: (input: DeleteEmailInput) => void;
}

export default function EmailsPaper(props: Props) {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <ChunkPaper
      primary="邮箱列表"
      action={
        <Button variant="contained" onClick={onClick}>
          添加
        </Button>
      }
    >
      <ListEmail {...props} />
      <CreateEmailDialog
        open={open}
        onClose={onClose}
        onCreate={props.onCreate}
      />
    </ChunkPaper>
  );
}
