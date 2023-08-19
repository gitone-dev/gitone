import CircularProgress from "@mui/material/CircularProgress";
import Layout from "../layout";

function LoadingPage() {
  return (
    <Layout.Simple>
      <CircularProgress />
    </Layout.Simple>
  );
}

export default LoadingPage;
