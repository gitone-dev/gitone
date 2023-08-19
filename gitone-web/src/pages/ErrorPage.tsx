import Typography from "@mui/material/Typography";
import Layout from "../layout";

interface Props {
  message: string;
}

function ErrorPage(props: Props) {
  return (
    <Layout.Simple>
      <Typography variant="h4">Error</Typography>
      <Typography>{props.message}</Typography>
    </Layout.Simple>
  );
}

export default ErrorPage;
