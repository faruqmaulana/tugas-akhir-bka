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

export const changeDateFormatToNumeric = (date: Date | null | undefined) => {
  if (!date) return "-";
  const formattedDate = format(date, "dd/MM/yyyy HH:mm", {
    locale: id,
  });

  return formattedDate;
};
