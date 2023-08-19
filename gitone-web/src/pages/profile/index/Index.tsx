import TextField from "@mui/material/TextField";
import { useViewerQuery } from "../../../generated/types";
import Layout from "../../../layout";
import ChunkPaper from "../../../shared/ChunkPaper";

function Index() {
  const { data } = useViewerQuery();

  return (
    <Layout.Profile>
      <ChunkPaper primary="昵称">
        <TextField disabled={true} size="small" value={data?.viewer.name} />
      </ChunkPaper>
    </Layout.Profile>
  );
}

export default Index;
