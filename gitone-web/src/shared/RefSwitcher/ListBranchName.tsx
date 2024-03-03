import {
  BranchOrderField,
  OrderDirection,
  useBranchesQuery,
} from "@/generated/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

export interface Props {
  fullPath: string;
  revision: string;
  type: string;
  path: string;
  query: string | null | undefined;
  getPathname: (type: string, revision: string, path: string) => string;
}

export function ListBranchName(props: Props) {
  const { fullPath, revision, type, path, query, getPathname } = props;

  const { data } = useBranchesQuery({
    fetchPolicy: "network-only",
    variables: {
      fullPath,
      first: 20,
      filterBy: { query },
      orderBy: {
        direction: OrderDirection.Desc,
        field: BranchOrderField.CommitterDate,
      },
    },
  });

  const edges = data?.repository?.branches?.edges || [];
  const pageInfo = data?.repository?.branches?.pageInfo;

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
          <ListItemButton component={RouterLink} to={`/${fullPath}/-/branches`}>
            <ListItemText primary="全部分支" />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
}
