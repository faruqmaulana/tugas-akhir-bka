/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type KejuaraanByIdType } from "~/server/api/module/pengajuan/_router";
import { changeDateFormatToNumeric } from "../helpers/changeDateFormat";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

export type transformedActivityLogType = {
  id: string;
  status: string;
  userName: string;
  catatan: string | null;
  date: string;
};

export const transformActivityLog = (
  data: KejuaraanByIdType["activityLog"] | undefined
) => {
  return data?.map((val) => {
    return {
      id: val.id,
      status: val.status,
      userName: `${val.User.name} (${capitalizeFirstLetter(val.User.role)})`,
      catatan: val.catatan,
      date: changeDateFormatToNumeric(val.createdAt),
    };
  }) as transformedActivityLogType[] | undefined;
};
