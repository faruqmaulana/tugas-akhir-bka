/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type KejuaraanByIdType } from "~/server/api/module/pengajuan/prestasi";
import { changeDateFormatToNumeric } from "../helpers/changeDateFormat";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

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
  });
};
