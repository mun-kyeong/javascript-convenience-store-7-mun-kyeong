import { Console, DateTimes } from "@woowacourse/mission-utils";

const formatDate = (date) => {
  if (date < 10) {
    return `0${date}`;
  }
  return date;
};

export const getCurrentDate = () => {
  const today = new DateTimes.now();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}-${formatDate(month)}-${formatDate(date)}`;
};
