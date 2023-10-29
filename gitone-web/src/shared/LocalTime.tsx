import dayjs from "./dayts";

interface Props {
  date: string;
  suffix?: string;
}

function LocalTime(props: Props) {
  const day = dayjs(props.date);

  return (
    <span title={props.date}>
      {day.format("L LT")} {props.suffix}
    </span>
  );
}

export default LocalTime;
