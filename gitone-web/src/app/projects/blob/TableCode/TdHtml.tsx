import Box from "@mui/material/Box";

interface Props {
  html: string;
}

export default function TdHtml(props: Props) {
  const { html } = props;

  return (
    <Box
      component="td"
      sx={{
        py: 0,
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        height: "1.2rem",
        lineHeight: "1.2rem",
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
