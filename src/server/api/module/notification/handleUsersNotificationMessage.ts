import {
  PENGAJUAN_ACCEPTED_BY_USER_SIDE,
  PENGAJUAN_EDITED_BY_ADMIN_SIDE,
  PENGAJUAN_EDITED_BY_USER_SIDE,
  PENGAJUAN_REJECTED_BY_ADMIN_SIDE,
  PENGAJUAN_REJECTED_BY_USER_SIDE,
  PENGAJUAN_REPROCESS_BY_ADMIN_SIDE,
  PENGAJUAN_REPROCESS_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { STATUS } from "~/common/enums/STATUS";

const handleUsersNotificationMessage = ({
  status,
  MODULE,
  ACTION_TYPE,
}: {
  status: string;
  MODULE: string;
  ACTION_TYPE?: "EDIT";
}) => {
  const IS_REPROCESS = status === STATUS.REJECT || status === STATUS.APPROVE;

  // ** SPECIAL CASE FOR ACTION TYPE EDIT */
  if (ACTION_TYPE === "EDIT") {
    if (IS_REPROCESS) {
      return {
        forUserMessage: PENGAJUAN_REPROCESS_BY_USER_SIDE(MODULE),
        forAdminMessage: PENGAJUAN_REPROCESS_BY_ADMIN_SIDE(MODULE),
      };
    }
    return {
      forUserMessage: PENGAJUAN_EDITED_BY_USER_SIDE(MODULE),
      forAdminMessage: PENGAJUAN_EDITED_BY_ADMIN_SIDE(MODULE),
    };
  }
  // ** END OF SPECIAL CASE FOR ACTION TYPE EDIT */

  if (status === STATUS.APPROVE) {
    return {
      forUserMessage: PENGAJUAN_ACCEPTED_BY_USER_SIDE(MODULE),
      forAdminMessage: PENGAJUAN_REJECTED_BY_ADMIN_SIDE(MODULE),
    };
  }

  if (status === STATUS.REJECT) {
    return {
      forUserMessage: PENGAJUAN_REJECTED_BY_USER_SIDE(MODULE),
      forAdminMessage: PENGAJUAN_REJECTED_BY_ADMIN_SIDE(MODULE),
    };
  }

  return;
};

export default handleUsersNotificationMessage;
