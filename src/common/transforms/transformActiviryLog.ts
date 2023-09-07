import { type KejuaraanByIdType } from "~/server/api/module/pengajuan/prestasi";
import { type StepperVerticalProp } from "../components/ui/stepper/StepperVertical";
import { changeDateFormat } from "../helpers/changeDateFormat";

export const transformActivityLog = (
  data: KejuaraanByIdType["activityLog"] | undefined
) => {
  return data?.map((val) => {
    return {
      status: val.status,
      userName: val.User.name as string,
      catatan: val.catatan,
      date: changeDateFormat(val.createdAt),
    };
  }) as StepperVerticalProp[];
};
