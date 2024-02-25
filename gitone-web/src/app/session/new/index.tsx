import Layout from "@/layout";
import Typography from "@mui/material/Typography";
import Form from "./Form";

export default function New() {
  return (
    <Layout.Unauthorized sx={{ margin: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        登录
      </Typography>
      <Form />
    </Layout.Unauthorized>
  );
}
