import { STATUS } from "~/common/enums/STATUS";

const handleUpdateModuleStatus = (status: string) => {
  if (status === STATUS.PROCESSED || status === STATUS.EDITED) {
    return STATUS.EDITED;
  }
  return STATUS.REPROCESS;
};

export default handleUpdateModuleStatus;
