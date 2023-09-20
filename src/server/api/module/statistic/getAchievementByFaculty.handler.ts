/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Prisma } from "@prisma/client";
import { STATUS } from "~/common/enums/STATUS";
import { protectedProcedure } from "~/server/api/trpc";

const approvedAchievementQuery = {
  select: {
    user: {
      select: {
        prodi: {
          select: {
            Fakultas: {
              select: { name: true },
            },
          },
        },
      },
    },
  },
  where: {
    PrestasiDataTable: {
      status: {
        equals: STATUS.APPROVE,
      },
    },
  },
};

export type BarResultType = {
  keys: string[];
  barData: { [x: string]: string | number; name: string }[];
};

export type KejuaraanByIdType = Prisma.PengajuanOnUsersGetPayload<{
  select: (typeof approvedAchievementQuery)["select"];
  where: (typeof approvedAchievementQuery)["where"];
}>[];

const getAchievementByFacultyHandler = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const approvedAchievementData =
        await ctx.prisma.pengajuanOnUsers.findMany(approvedAchievementQuery);
      // Create a map to accumulate the totals
      const groupedDataMap: Record<string, number> = {};

      approvedAchievementData.forEach((item) => {
        const fakultasName = item?.user?.prodi?.Fakultas?.name;

        if (fakultasName) {
          // Increment the total for the fakultasName
          groupedDataMap[fakultasName] =
            (groupedDataMap[fakultasName] || 0) + 1;
        }
      });

      // Convert the map into the desired format
      const barData = Object.entries(groupedDataMap).map(([name, total]) => ({
        name,
        [name]: total,
      }));

      const keys: string[] = barData.map((val) => val.name);

      const result = {
        keys,
        barData,
      };

      return result as BarResultType;
    } catch (error) {
      return error;
    }
  }
);

export default getAchievementByFacultyHandler;
