import TextField from "@mui/material/TextField";
import { useViewerQuery } from "../../../generated/types";
import ChunkPaper from "../../../shared/ChunkPaper";

function UsernamePaper() {
  const { data } = useViewerQuery();

  return (
    <ChunkPaper primary="用户名">
      <TextField disabled size="small" value={data?.viewer.username} />
    </ChunkPaper>
  );
}

export default UsernamePaper;
