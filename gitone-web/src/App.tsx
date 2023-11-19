import LoadingPage from "@/app/LoadingPage";
import { useViewerQuery } from "@/generated/types";
import Layout from "@/layout";
import { Navigate } from "react-router-dom";

function App() {
  const { data, loading } = useViewerQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (data?.viewer) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Layout.Simple>Hello GitOne!</Layout.Simple>;
  }
}

export default App;
