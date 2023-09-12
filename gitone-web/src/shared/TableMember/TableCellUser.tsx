import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Maybe, User } from "../../generated/types";

interface Props {
  user?: Maybe<User>;
}

function TableCellUser(props: Props & TableCellProps) {
  const { user, ...tableCellProps } = props;
  const userPath = `/${user?.username}`;

  return (
    <TableCell {...tableCellProps}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={user?.avatarUrl || ""}
          component={RouterLink}
          to={userPath}
        />
        <Box>
          <Typography variant="subtitle1">
            <Link
              component={RouterLink}
              to={userPath}
              color="inherit"
              underline="none"
            >
              {user?.name}
            </Link>
          </Typography>
          <Typography>
            <Link component={RouterLink} to={userPath} color="inherit">
              @{user?.username}
            </Link>
          </Typography>
        </Box>
      </Stack>
    </TableCell>
  );
}

export default TableCellUser;
