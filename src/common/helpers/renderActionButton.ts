import { Role } from "@prisma/client";
import { STATUS } from "../enums/STATUS";

const renderActionButton = ({
  status,
  role,
}: {
  status?: string;
  role?: string;
}) => {
  switch (true) {
    case role === Role.ADMIN &&
      (status === STATUS.PROCESSED ||
        status === STATUS.EDITED ||
        status === STATUS.REPROCESS):
      return true;
    default:
      return false;
  }
};
export default renderActionButton;
