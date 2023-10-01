export const asiaJakartaTimezone = () => {
  // Create a new Date object representing the current date and time in UTC.
  const currentDateUTC = new Date();

  // Get the offset in minutes for the Asia/Jakarta timezone, which is UTC+7.
  const jakartaTimezoneOffsetMinutes = -420;

  // Calculate the local time in Jakarta by adding the offset.
  const currentDateJakarta = new Date(
    currentDateUTC.getTime() + jakartaTimezoneOffsetMinutes * 60000
  );

  return currentDateJakarta;
};
