import { formatDistance } from "date-fns";
import id from "date-fns/locale/id";

const timeAgo = (date: Date) => {
  return (
    formatDistance(date, new Date(), {
      locale: id,
    }).replace("sekitar", "") + " yang lalu"
  );
};

export default timeAgo;
