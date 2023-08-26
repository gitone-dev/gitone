import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "../../../generated/types";
import Layout from "../../../layout";
import ErrorPage from "../../ErrorPage";

function ConfirmEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmEmailMutation] = useConfirmEmailMutation();

  const onClick = () => {
    if (!token) return;

    confirmEmailMutation({
      variables: { input: { token } },
      onCompleted() {
        enqueueSnackbar("修改成功", { variant: "success" });
        navigate("/", { replace: true });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  if (!token) {
    return <ErrorPage message="令牌无效" />;
  }

  return (
    <Layout.Center sx={{ margin: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        绑定邮箱
      </Typography>
      <Box>
        <Button variant="contained" onClick={onClick}>
          绑定
        </Button>
      </Box>
    </Layout.Center>
  );
}

export default ConfirmEmail;
