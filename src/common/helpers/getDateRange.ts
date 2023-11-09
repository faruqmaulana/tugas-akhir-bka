import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInYears,
  isBefore,
} from "date-fns";

export type DateProps = Date | null | undefined;
type dateRange = {
  createdAt: DateProps;
  expiredDate: DateProps;
  type?: "GET_EXPIRED_STATUS" | "GET_DATE_RANGE";
};

export const getDateRange = (props: dateRange) => {
  const { createdAt, expiredDate, type = "GET_DATE_RANGE" } = props;

  // handle empty params
  if (!createdAt || !expiredDate) return "-";

  // get date object
  const currentDate = new Date(createdAt); // current date and time
  const expiredAt = new Date(expiredDate); // replace with your expiration date

  // return expired status data option
  const isExpired = isBefore(expiredAt, currentDate);

  if (type === "GET_EXPIRED_STATUS") {
    if (isExpired) return "Expired";
    return "Aktif";
  }

  // different in years
  const yearsDifference = differenceInCalendarYears(expiredAt, currentDate);
  if (!!yearsDifference) return `${yearsDifference} tahun`;

  // different in month
  const monthsDifference = differenceInCalendarMonths(expiredAt, currentDate);
  if (!!monthsDifference) return `${monthsDifference} bulan`;

  // different in years
  const daysDifference = differenceInCalendarDays(expiredAt, currentDate);
  if (!!daysDifference) return `${daysDifference} hari`;

  // different in years
  const hoursDifference = differenceInHours(expiredAt, currentDate);
  if (!!hoursDifference) return `${hoursDifference} jam`;

  return `-`;
};
