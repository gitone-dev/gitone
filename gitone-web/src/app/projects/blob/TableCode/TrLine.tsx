import { BlobLine } from "@/generated/types";
import Box from "@mui/material/Box";
import yellow from "@mui/material/colors/yellow";
import TdHtml from "./TdHtml";
import TdNumber from "./TdNumber";

export type Range = [number, number];

interface Props {
  blobLine: BlobLine;
  range: Range;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function TrLine(props: Props) {
  const {
    blobLine: { number, html },
    range,
    onClick,
  } = props;

  const backgroundColor =
    number && number >= range[0] && number <= range[1]
      ? yellow[100]
      : "inherit";

  return (
    <Box component="tr" id={`LC${number}`} sx={{ backgroundColor }}>
      <TdNumber number={number} onClick={onClick} />
      <TdHtml html={html || ""} />
    </Box>
  );
}
