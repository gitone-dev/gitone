import Layout from "@/layout";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingPage() {
  return (
    <Layout.Simple>
      <CircularProgress />
    </Layout.Simple>
  );
}

export default LoadingPage;
