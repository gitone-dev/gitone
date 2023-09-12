import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import { Maybe, Visibility } from "../generated/types";

interface Props {
  visibility: Maybe<Visibility>;
}

function VisibilityIcon(props: Props) {
  const { visibility } = props;

  switch (visibility) {
    case Visibility.Public:
      return <PublicIcon fontSize="inherit" sx={{ ml: 1 }} />;
    case Visibility.Private:
      return <LockIcon fontSize="inherit" sx={{ ml: 1 }} />;
    default:
      <></>;
  }
}

export default VisibilityIcon;
