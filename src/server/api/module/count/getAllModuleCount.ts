import { STATUS } from "~/common/enums/STATUS";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { PatenAndHaki } from "@prisma/client";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import removeDuplicates from "~/common/helpers/removeDuplicates";

export type ModuleCountType = {
  module: string;
  count: number;
};

export const allModuleCount = createTRPCRouter({
  //** GET ALL PRODI */
  getAllModuleCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      const isAdmin = ctx.session.user.role === "ADMIN";
      const query = !isAdmin ? { userId: ctx.session.user.userId } : {};
      const filterStatus = {
        NOT: {
          OR: [
            { status: STATUS.ACTIVE },
            { status: STATUS.APPROVE },
            isAdmin ? {} : { status: STATUS.REJECT },
          ],
        },
      };

      const champhionshipCountPromise = ctx.prisma.pengajuanOnUsers.count({
        where: {
          ...query,
          NOT: {
            prestasiDataTableId: null,
          },
          PrestasiDataTable: filterStatus,
        },
      });

      const hakiCountPromise = ctx.prisma.pengajuanOnUsers.findMany({
        where: {
          ...query,
          NOT: {
            PengajuanPatenAndHakiTableId: null,
          },
          PengajuanPatenAndHakiTable: {
            ...filterStatus,
            jenis: PatenAndHaki.HAKI,
          },
        },
        select: {
          PengajuanPatenAndHakiTableId: true
        },
      });

      const patenCountPromise = ctx.prisma.pengajuanOnUsers.findMany({
        where: {
          ...query,
          NOT: {
            PengajuanPatenAndHakiTableId: null,
          },
          PengajuanPatenAndHakiTable: {
            ...filterStatus,
            jenis: PatenAndHaki.PATEN,
          },
        },
        select: {
          PengajuanPatenAndHakiTableId: true,
        },
      });

      const pkmCountPromise = ctx.prisma.pengajuanOnUsers.findMany({
        where: {
          ...query,
          NOT: {
            PengajuanPKMId: null,
          },
          PengajuanPKM: {
            ...filterStatus,
          },
        },
        select: {
          PengajuanPKMId: true,
        },
      });

      const scholarshipCountPromise = ctx.prisma.pengajuanBeasiswa.count({
        where: { ...query, ...filterStatus },
      });

      const bookCountPromise = ctx.prisma.buku.count({
        where: { ...query, ...filterStatus },
      });

      const [
        champhionshipCount,
        hakiCount,
        patenCount,
        pkmCount,
        scholarshipCount,
        bookCount,
      ] = await Promise.all([
        champhionshipCountPromise,
        hakiCountPromise,
        patenCountPromise,
        pkmCountPromise,
        scholarshipCountPromise,
        bookCountPromise,
      ]);

      const summary = [
        {
          module: MODULE_TYPE_CODE.KEJUARAAN,
          count: champhionshipCount,
        },
        {
          module: MODULE_TYPE_CODE.PKM,
          count: removeDuplicates(pkmCount, "PengajuanPKMId")?.length,
        },
        {
          module: MODULE_TYPE_CODE.BEASISWA,
          count: scholarshipCount,
        },
        {
          module: MODULE_TYPE_CODE.HAKI,
          count: removeDuplicates(hakiCount, "PengajuanPatenAndHakiTableId")?.length,
        },
        {
          module: MODULE_TYPE_CODE.PATEN,
          count: removeDuplicates(patenCount, "PengajuanPatenAndHakiTableId")?.length,
        },
        {
          module: MODULE_TYPE_CODE.BUKU,
          count: bookCount,
        },
      ];

      return summary as ModuleCountType[];
    } catch (error) {
      return error;
    }
  }),
});
