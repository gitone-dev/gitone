import Typography from "@mui/material/Typography";
import ChunkPaper from "./ChunkPaper";

interface Props {
  message: string;
}

export default function ErrorBox(props: Props) {
  const { message } = props;

  return (
    <ChunkPaper primary="ERROR">
      <Typography variant="h6" sx={{ mb: 1 }}>
        {message}
      </Typography>
      <Typography variant="body1" color="initial">
        {props.message}
      </Typography>
    </ChunkPaper>
  );
}
