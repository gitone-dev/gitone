import Typography from "@mui/material/Typography";
import Layout from "../../../layout";
import Form from "./Form";

function New() {
  return (
    <Layout.Unauthorized sx={{ margin: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        注册新用户
      </Typography>
      <Form />
    </Layout.Unauthorized>
  );
}

export default New;
