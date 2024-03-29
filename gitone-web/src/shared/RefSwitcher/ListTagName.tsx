import { OrderDirection, TagOrderField, useTagsQuery } from "@/generated/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  fullPath: string;
  revision: string;
  type: string;
  path: string;
  query: string | null | undefined;
  getPathname: (type: string, revision: string, path: string) => string;
}

export function ListTagName(props: Props) {
  const { fullPath, revision, type, path, query, getPathname } = props;

  const { data } = useTagsQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      first: 20,
      filterBy: { query },
      orderBy: {
        direction: OrderDirection.Desc,
        field: TagOrderField.CommitterDate,
      },
    },
  });
  const edges = data?.repository?.tags?.edges || [];
  const pageInfo = data?.repository?.tags?.pageInfo;

  return (
    <List dense>
      {edges.map((edge) => (
        <ListItem key={edge.cursor} disablePadding divider>
          <ListItemButton
            selected={revision === edge.node.name}
            component={RouterLink}
            to={getPathname(type, edge.node.name, path)}
          >
            <ListItemText primary={edge.node.name} />
          </ListItemButton>
        </ListItem>
      ))}
      {pageInfo?.hasNextPage && (
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={`/${fullPath}/-/tags`}>
            <ListItemText primary="全部标签" />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
}
