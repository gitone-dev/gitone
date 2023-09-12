import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import isLeapYear from "dayjs/plugin/isLeapYear";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isLeapYear);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

interface Props {
  date: string;
}

function RelativeTime(props: Props) {
  const day = dayjs(props.date);

  return <span title={day.format("L LT")}>{day.fromNow()}</span>;
}

export default RelativeTime;
