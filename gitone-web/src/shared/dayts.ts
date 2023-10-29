import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import isLeapYear from "dayjs/plugin/isLeapYear";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(isLeapYear);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = dayjs.tz.guess();

export default dayjs;
export { Dayjs, tz };
