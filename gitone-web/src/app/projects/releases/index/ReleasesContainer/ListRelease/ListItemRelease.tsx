import { DeleteReleaseInput, Policy, Release } from "@/generated/types";
import SellIcon from "@mui/icons-material/Sell";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  fullPath: string;
  policy: Policy;
  release: Release;
  onDelete: (input: DeleteReleaseInput) => void;
}

export default function ListItemRelease(props: Props) {
  const { fullPath, release } = props;

  return (
    <ListItem divider>
      <ListItemIcon>
        <SellIcon />
      </ListItemIcon>
      <ListItemText>
        <Link
          color="text.primary"
          component={RouterLink}
          to={`/${fullPath}/-/releases/${release.tagName}`}
          underline="hover"
          variant="body1"
        >
          {release.title}
        </Link>
      </ListItemText>
    </ListItem>
  );
}
