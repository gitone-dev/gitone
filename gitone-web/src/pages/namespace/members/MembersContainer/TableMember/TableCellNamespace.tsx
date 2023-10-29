import Link from "@mui/material/Link";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Maybe, Namespace } from "../../../../../generated/types";

interface Props {
  fullPath: string;
  namespace?: Maybe<Namespace>;
}

function TableCellNamespace(props: Props & TableCellProps) {
  const { fullPath, namespace, ...tableCellProps } = props;

  return (
    <TableCell {...tableCellProps}>
      <Typography variant="subtitle1">
        {fullPath === namespace?.fullPath ? (
          <>直接</>
        ) : (
          <Link
            component={RouterLink}
            to={`/${namespace?.fullPath}`}
            color="inherit"
            underline="hover"
          >
            {namespace?.fullName}
          </Link>
        )}
      </Typography>
    </TableCell>
  );
}

export default TableCellNamespace;
