import moment from "moment-timezone";

const currentDateServer = (): moment.Moment => {
  const jakartaTimezone = "Asia/Jakarta";
  const currentDate = moment().tz(jakartaTimezone);
  return currentDate;
};

export default currentDateServer;
