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
  userInfoMeta: {
    name: string;
    npm: string;
    prodiName: string;
    semester: string;
    role: string
  };
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
      userInfoMeta: {
        name: val.User.name,
        npm: val.User.npm,
        prodiName: val.User.prodi?.name,
        semester: val.User.semester,
        role: val.User.role,
      },
    };
  }) as transformedActivityLogType[] | undefined;
};
