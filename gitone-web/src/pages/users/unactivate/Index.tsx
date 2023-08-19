import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendActivationEmailMutation } from "../../../generated/types";
import Layout from "../../../layout";
import ErrorPage from "../../ErrorPage";
import UpdateActivationEmailDialog from "./UpdateActivationEmailDialog";

interface State {
  email?: string;
}

function Unactivate() {
  const location = useLocation();
  const { email } = (location.state || {}) as State;
  const { enqueueSnackbar } = useSnackbar();
  const [sendActivationEmailMutation] = useSendActivationEmailMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onClick = () => {
    sendActivationEmailMutation({
      variables: { input: { email } },
      onCompleted() {
        navigate("/users/sent", { replace: true, state: { email: email } });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  if (!email) {
    return <ErrorPage message="无法确认你是否注册了账户。" />;
  }

  return (
    <Layout.Simple sx={{ py: 4 }}>
      <Typography>
        你还不能登录。我们已经发送了一封邮件至 <b>{email}</b>
        ，请打开它并完成用户激活。
      </Typography>
      <br />
      <Stack direction="row">
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          startIcon={<MailOutlineIcon />}
          onClick={onClick}
        >
          重发激活邮件
        </Button>
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={onOpen}
        >
          更改邮箱
        </Button>
      </Stack>
      <UpdateActivationEmailDialog
        email={email}
        open={open}
        onClose={onClose}
      />
    </Layout.Simple>
  );
}

export default Unactivate;
