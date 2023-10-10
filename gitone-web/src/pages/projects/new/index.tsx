import { useLocation } from "react-router-dom";
import {
  Namespace,
  useNamespaceQuery,
  useViewerQuery,
} from "../../../generated/types";
import ErrorBox from "../../../shared/ErrorBox";
import LoadingBox from "../../../shared/LoadingBox";
import Form from "./Form";

function New() {
  const location = useLocation();
  const viewer = useViewerQuery({ fetchPolicy: "cache-only" }).data?.viewer;
  const { data, loading, error } = useNamespaceQuery({
    variables: {
      fullPath: viewer?.username || "",
    },
  });

  const namespace = (location.state as Namespace) || data?.namespace;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!namespace) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return <Form namespace={namespace} />;
}

export default New;
