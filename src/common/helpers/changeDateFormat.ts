import { format } from "date-fns";
import id from "date-fns/locale/id";

export const changeDateFormat = (date: Date | null) => {
  if (!date) return "-";
  return format(date, "PPP", {
    locale: id,
  });
};
