import { format } from "date-fns";
import id from "date-fns/locale/id";

export const changeDateFormat = (
  date: Date | null | undefined,
  detail = false
) => {
  if (!date) return "-";
  // get date formate
  const formattedDate = format(date, "PPP", {
    locale: id,
  });

  if (!detail) return formattedDate;

  // get time in minute format
  const formattedTime = format(date, "p", {
    locale: id,
  });

  return `${formattedDate}, pukul ${formattedTime}`;
};
