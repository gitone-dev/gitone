import dayjs from "./dayts";

interface Props {
  date: string;
}

function RelativeTime(props: Props) {
  const day = dayjs(props.date);

  return <span title={props.date}>{day.fromNow()}</span>;
}

export default RelativeTime;
