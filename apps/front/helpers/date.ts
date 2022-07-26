import { ErrorMessage } from "./error";

const daySet = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad = (value: number) => (value < 10 ? `0${value}` : `${value}`);

export const parseDay = (day: number) => {
  if (day < 0 || day > 6) {
    throw new Error(ErrorMessage.WRONG_DAY);
  }
  return daySet[day];
};

export const parseISO = (isoDate: string) => {
  const date = new Date(isoDate);
  return `${parseDay(date.getDay())}, ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
};
