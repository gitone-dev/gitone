import { useEffect } from "react";
import {
  Maybe,
  OrderDirection,
  ProjectOrderField,
  Visibility,
  useProjectsQuery,
} from "../../generated/types";
import ErrorBox from "../ErrorBox";
import ListProject from "../ListProject";
import LoadingBox from "../LoadingBox";

interface Props {
  parentId?: string;
  username?: Maybe<string>;
  query?: Maybe<string>;
  visibility?: Maybe<Visibility>;
  orderField: ProjectOrderField;
  recursive?: boolean;
}

function ProjectsContainer(props: Props) {
  const { parentId, username, query, visibility, recursive, orderField } =
    props;
  const { data, loading, error, fetchMore } = useProjectsQuery({
    fetchPolicy: "network-only",
    variables: {
      first: 20,
      filterBy: {
        username,
        visibility,
        query,
        parentId,
        recursive: Boolean(recursive),
      },
      orderBy: {
        direction:
          orderField === ProjectOrderField.Path
            ? OrderDirection.Asc
            : OrderDirection.Desc,
        field: orderField,
      },
    },
  });
  const edges = data?.projects?.edges;
  const pageInfo = data?.projects?.pageInfo;

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

  return <ListProject edges={edges} pageInfo={pageInfo} loadMore={onScroll} />;
}

export default ProjectsContainer;
