import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Tag } from "../generated/types";

interface Props {
  tag: Tag;
}

function TagTip(props: Props) {
  const { tag } = props;

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
          {tag.fullMessage}
        </Typography>
      }
    >
      <Typography color="text.secondary" variant="body2">
        {tag.shortMessage}
      </Typography>
    </Tooltip>
  );
}

export default TagTip;
