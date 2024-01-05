import { BlobLineEdge } from "@/generated/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableCode, { Range } from "./TableCode";

const RANGE_REG = /^#L(?<start>\d+)(-L(?<end>\d+))?$/;

function getRange(hash: string): Range {
  const groups = hash.match(RANGE_REG)?.groups;
  if (!groups) return [0, 0];

  const start = Number(groups.start);
  const end = Number(groups.end) || start;

  if (end < start) {
    return [end, start];
  }
  return [start, end];
}

interface Props {
  edges: Array<BlobLineEdge>;
}

export default function Text(props: Props) {
  const { edges } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [range, setRange] = useState(getRange(location.hash));

  useEffect(() => {
    const el = document.getElementById(`LC${range[0]}`);
    if (el?.offsetTop) {
      window.scrollTo(0, el.offsetTop + 142);
    }
  }, []);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const data = event.currentTarget.getAttribute("data-line-number");
    const number = Number(data);
    if (!isNaN(number)) {
      setRange([number, number]);
    }
    // TODO 渲染慢
    navigate(`#L${number}`);
  };

  return <TableCode edges={edges} range={range} onClick={onClick} />;
}
