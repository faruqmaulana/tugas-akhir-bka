/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MOUDLE_HAKI } from "~/common/constants/MESSAGE";
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { protectedProcedure } from "~/server/api/trpc";
import { EDIT, HAKI_NOTIF, REPROCESS } from "~/common/message";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { editHakiForm } from "~/common/schemas/module/pengajuan/haki/edit-haki-application.schema";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import handleUpdateModuleStatus from "../../notification/handleStatus";

const editHakiHandler = protectedProcedure
  .input(editHakiForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        judul,
        keterangan,
        dokumenPendukung,
        users,
        patenAndHakiTableId,
        catatan,
      } = input;
      const dosenData = users.filter((item) => item.role === "DOSEN");
      const mahasiswaData = users.filter((item) => item.role === "MAHASISWA");
      const transformedDosenData = dosenData.map((val) => {
        return {
          userId: val.value,
          keterangan: "temp",
        };
      });

      const dokumenJsonMeta =
        stringToJSON(dokumenPendukung || undefined) || undefined;

      const getCurrentModuleStatus =
        await ctx.prisma.patenAndHakiTable.findUnique({
          where: {
            id: patenAndHakiTableId,
          },
          select: {
            status: true,
          },
        });

      const status = getCurrentModuleStatus?.status;
      const isReprocessMsg =
        status === STATUS.REJECT || status === STATUS.APPROVE;

      //** UPDATE HAKI APPLICATION */
      const updateHakiApplication = await ctx.prisma.patenAndHakiTable.update({
        where: { id: patenAndHakiTableId },
        include: {
          PengajuanOnUsers: true,
        },
        data: {
          judul,
          keterangan,
          dokumenPendukung: dokumenJsonMeta,
          dosen: transformedDosenData,
          status: handleUpdateModuleStatus(status as string),
        },
      });

      await ctx.prisma.pengajuanOnUsers.deleteMany({
        where: {
          AND: {
            PengajuanPatenAndHakiTableId: patenAndHakiTableId,
            userId: {
              in: updateHakiApplication?.PengajuanOnUsers.map(
                (val) => val.userId
              ),
            },
          },
        },
      });

      // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON HAKI DATA TABLE AND USERS
      await ctx.prisma.pengajuanOnUsers.createMany({
        data: mahasiswaData.map((val) => {
          return {
            userId: val.value,
            keterangan: val.isKetua ? "Ketua Tim" : "Anggota",
            PengajuanPatenAndHakiTableId: patenAndHakiTableId,
          };
        }),
      });

      //** HANDLE EDIT NOTIFICATION */
      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.HAKI,
          moduleId: patenAndHakiTableId,
          note: catatan,
          MODULE: MOUDLE_HAKI,
          ACTION_TYPE: "EDIT",
          selectedUsers: mahasiswaData,
          STATUS_TYPE: status as string,
        },
      });

      return {
        message: `${isReprocessMsg ? REPROCESS : EDIT} ${HAKI_NOTIF}`,
      };
    } catch (error) {}
  });

export default editHakiHandler;
