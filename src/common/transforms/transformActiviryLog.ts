/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type KejuaraanByIdType } from "~/server/api/module/pengajuan/prestasi";
import { changeDateFormat } from "../helpers/changeDateFormat";

export const transformActivityLog = (
  data: KejuaraanByIdType["activityLog"] | undefined
) => {
  return data?.map((val) => {
    return {
      id: val.id,
      status: val.status,
      userName: val.User.name,
      catatan: val.catatan,
      date: changeDateFormat(val.createdAt),
    };
  });
};
