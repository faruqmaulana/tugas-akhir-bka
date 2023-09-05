import { STATUS } from "~/common/enums/STATUS";
import { useCurrentUser } from "../profile";

export type transformedStatus = {
  status: string;
  isNotification?: boolean;
};
const useStatus = () => {
  const { isAdmin } = useCurrentUser();

  const handleTransformedStatus = ({
    status,
    isNotification = false,
  }: transformedStatus): string => {
    // FOR NOTIFICATION CARD UI
    if (isNotification) {
      if (isAdmin && status === STATUS.PROCESSED) return "Diajukan";
    }

    if (isAdmin && status === STATUS.PROCESSED) return "Baru";
    return status;
  };

  return { handleTransformedStatus };
};

export { useStatus };
