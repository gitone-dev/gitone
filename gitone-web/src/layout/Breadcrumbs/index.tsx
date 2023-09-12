import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface BreadcrumbItems {
  [key: string]: Array<{ to: string; text: string }>;
}

interface Props {
  items: BreadcrumbItems;
}

function Breadcrumbs(props: Props) {
  const { items } = props;
  const { pathname } = useLocation();

  const breadcrumbs = items[pathname];
  return (
    <MuiBreadcrumbs>
      {breadcrumbs.map((b) =>
        b.to !== pathname ? (
          <Link
            key={b.to}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={b.to}
          >
            {b.text}
          </Link>
        ) : (
          <Typography key={b.to} color="text.primary">
            {b.text}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
export type { BreadcrumbItems };
