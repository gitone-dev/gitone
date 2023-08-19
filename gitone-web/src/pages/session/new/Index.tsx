import Typography from "@mui/material/Typography";
import Layout from "../../../layout";
import Form from "./Form";

function New() {
  return (
    <Layout.SignInOrUp sx={{ margin: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        登录
      </Typography>
      <Form />
    </Layout.SignInOrUp>
  );
}

export default New;
