import { BoxProps } from "@mui/material/Box";
import { Navigate } from "react-router-dom";
import { useViewerQuery } from "../generated/types";
import LoadingPage from "../pages/LoadingPage";
import Center from "./Center";

function Unauthorized(props: BoxProps) {
  const { data, loading } = useViewerQuery();

  if (loading) {
    return <LoadingPage />;
  } else if (data?.viewer) {
    return <Navigate to="/" />;
  }

  return <Center {...props} />;
}

export default Unauthorized;
