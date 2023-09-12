import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  message: string;
}

function ErrorBox(props: Props) {
  const { message } = props;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {message}
      </Typography>
      <Typography variant="body1" color="initial">
        {props.message}
      </Typography>
    </Box>
  );
}

export default ErrorBox;
