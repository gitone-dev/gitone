import Box from "@mui/material/Box";
import grey from "@mui/material/colors/grey";

interface Props {
  number: number | undefined | null;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function TdNumber(props: Props) {
  const { number, onClick } = props;

  return (
    <Box
      onClick={onClick}
      component="td"
      sx={{
        height: "1.2rem",
        lineHeight: "1.2rem",
        width: 32,
        textAlign: "right",
        px: 1,
        py: 0,
        m: 0,
        cursor: "pointer",
        color: grey[600],
        ":after": {
          content: "attr(data-line-number)",
        },
      }}
      data-line-number={number}
    />
  );
}
