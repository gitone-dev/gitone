import { RevisionPath, useBlobQuery } from "@/generated/types";
import ErrorBox from "@/shared/ErrorBox";
import LoadingBox from "@/shared/LoadingBox";
import { humanReadable } from "@/utils/size";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Text from "./Text";

interface Props {
  fullPath: string;
  revisionPath: RevisionPath;
}

function BlobContainer(props: Props) {
  const { fullPath, revisionPath } = props;

  const { data, loading, error } = useBlobQuery({
    variables: {
      fullPath,
      revision: revisionPath.revision,
      path: revisionPath.path,
    },
  });

  const blob = data?.repository?.blob;
  const policy = data?.namespacePolicy;

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <ErrorBox message={error.message} />;
  } else if (!blob || !policy) {
    return <ErrorBox message="客户端查询条件错误" />;
  }

  return (
    <Box pt={2}>
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1,
          borderRadius: 0,
          backgroundColor: "rgb(246, 248, 250)",
        }}
      >
        <Stack spacing={1} direction="row">
          <Typography variant="body2">
            {blob.text?.match(/\n/g)?.length} lines
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">{humanReadable(blob.size)}</Typography>
        </Stack>
      </Paper>
      <Paper elevation={2} sx={{ px: 2, pb: 2, pt: 1, borderRadius: 0 }}>
        <Text blob={blob} />
      </Paper>
    </Box>
  );
}

export default BlobContainer;
