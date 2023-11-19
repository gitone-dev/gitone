import {
  GroupOrderField,
  Maybe,
  OrderDirection,
  Visibility,
  useGroupsQuery,
} from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { useEffect } from "react";
import ListGroup from "./ListGroup";

interface Props {
  parentId?: string;
  username?: Maybe<string>;
  query?: Maybe<string>;
  visibility?: Maybe<Visibility>;
  orderField: GroupOrderField;
}

function GroupsContainer(props: Props) {
  const { parentId, username, query, visibility, orderField } = props;
  const { data, loading, error, fetchMore } = useGroupsQuery({
    fetchPolicy: "network-only",
    variables: {
      first: 20,
      filterBy: { username, visibility, query, parentId },
      orderBy: {
        direction:
          orderField === GroupOrderField.Path
            ? OrderDirection.Asc
            : OrderDirection.Desc,
        field: orderField,
      },
    },
  });
  const edges = data?.groups?.edges;
  const pageInfo = data?.groups?.pageInfo;

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  const onScroll = () => {
    if (loading) return;
    if (!pageInfo?.hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight + 16 < scrollHeight) return;

    fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!edges || !pageInfo) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return <ListGroup edges={edges} pageInfo={pageInfo} loadMore={onScroll} />;
}

export default GroupsContainer;
