import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useActivateUserMutation } from "../../../generated/types";
import Layout from "../../../layout";
import ErrorPage from "../../ErrorPage";

function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [activateUserMutation] = useActivateUserMutation();

  const onClick = () => {
    if (!token) return;

    activateUserMutation({
      variables: { input: { token } },
      onCompleted(data) {
        enqueueSnackbar(data.payload?.message, { variant: "success" });
        navigate("/", { replace: true });
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  };

  if (!token) {
    return <ErrorPage message="激活令牌不存在" />;
  }

  return (
    <Layout.Simple maxWidth="sm" sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" marginBottom={4}>
        欢迎来到 GitOne!
      </Typography>
      <Box margin="auto">
        <Button variant="contained" onClick={onClick}>
          激活用户
        </Button>
      </Box>
    </Layout.Simple>
  );
}

export default Activate;
