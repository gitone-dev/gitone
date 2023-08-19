import { usePingQuery } from "./generated/types";
import Layout from "./layout";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const { data, loading, error } = usePingQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage message={error.message} />;
  } else {
    return <Layout.Simple>{data?.ping}</Layout.Simple>;
  }
}

export default App;
