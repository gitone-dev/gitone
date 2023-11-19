import Link, { LinkProps } from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Commit, Maybe } from "../generated/types";

interface Props {
  fullPath: string;
  commit?: Maybe<Commit>;
}

function CommitTip(props: Props & LinkProps) {
  const { fullPath, commit, ...linkProps } = props;

  return (
    <Tooltip
      componentsProps={{
        tooltip: { sx: { maxWidth: "none" } },
        popper: { sx: { backgroundColor: "white" } },
        transition: { timeout: 0 },
      }}
      placement="bottom-start"
      title={
        <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
          {commit?.fullMessage}
        </Typography>
      }
    >
      <Link
        color="text.secondary"
        component={RouterLink}
        to={`/${fullPath}/-/commit/${commit?.sha}`}
        underline="hover"
        variant="body2"
        {...linkProps}
      >
        {commit?.shortMessage}
      </Link>
    </Tooltip>
  );
}

export default CommitTip;
