import Layout from "@/layout";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingPage() {
  return (
    <Layout.Simple>
      <CircularProgress />
    </Layout.Simple>
  );
}
