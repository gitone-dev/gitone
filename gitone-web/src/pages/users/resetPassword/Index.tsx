import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Layout from "../../../layout";
import ErrorPage from "../../ErrorPage";
import Form from "./Form";

function ResetPassword() {
  const { token } = useParams();

  if (!token) {
    return <ErrorPage message="令牌无效" />;
  }

  return (
    <Layout.SignInOrUp sx={{ margin: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        重置密码
      </Typography>
      <Form token={token} />
    </Layout.SignInOrUp>
  );
}

export default ResetPassword;
