import Typography from "@mui/material/Typography";
import Layout from "../../../layout";
import Form from "./Form";

function ForgetPassword() {
  return (
    <Layout.SignInOrUp sx={{ margin: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        发送密码重置邮件
      </Typography>
      <Form />
    </Layout.SignInOrUp>
  );
}

export default ForgetPassword;
