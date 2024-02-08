import {
  Maybe,
  OrderDirection,
  Policy,
  RegisteredClientOrderField,
  useRegisteredClientsQuery,
} from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useEffect } from "react";
import ListRegisteredClient from "./ListRegisteredClient";

interface Props {
  fullPath: string;
  policy: Policy;
  query?: Maybe<string>;
  orderField: RegisteredClientOrderField;
  orderDirection: OrderDirection;
}

export default function RegisteredClientsContainer(props: Props) {
  const { fullPath, policy, query, orderField, orderDirection } = props;

  const { data, loading, error, fetchMore } = useRegisteredClientsQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      first: 20,
      filterBy: { query },
      orderBy: {
        direction: orderDirection,
        field: orderField,
      },
    },
  });
  const edges = data?.registeredClients?.edges;
  const pageInfo = data?.registeredClients?.pageInfo;

  const onScroll = () => {
    if (loading) return;
    if (!pageInfo?.hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight + 16 < scrollHeight) return;

    fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!edges || !pageInfo || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <ListRegisteredClient
      fullPath={fullPath}
      edges={edges}
      pageInfo={pageInfo}
      loadMore={onScroll}
    />
  );
}
