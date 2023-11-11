/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { protectedProcedure } from "~/server/api/trpc";
import { ADD_SUCCESS } from "~/common/message";
import handleAddInitialNotification from "../../notification/handleAddInitialNotification";
import { hakiApplicationSchema } from "~/common/schemas/module/pengajuan/haki/haki-application.schema";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";

const addHakiHandler = protectedProcedure
  .input(hakiApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { judul, keterangan, dokumenPendukung, users, jenis } = input;
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

      //** ADD SCHOLARSHIP APPLICATION */
      const createHakiApplication = await ctx.prisma.patenAndHakiTable.create({
        data: {
          judul,
          keterangan,
          jenis,
          createdById: ctx.session.user.userId,
          dokumenPendukung: dokumenJsonMeta,
          dosen: transformedDosenData,
        },
      });

      // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON PRETASI DATA TABLE AND USERS
      await ctx.prisma.pengajuanOnUsers.createMany({
        data: mahasiswaData.map((val) => {
          return {
            userId: val.value,
            keterangan: val.isKetua ? "Ketua Tim" : "Anggota",
            PengajuanPatenAndHakiTableId: createHakiApplication.id,
          };
        }),
      });

      //** HANDLE ADD INITIAL NOTIFICATION */
      await handleAddInitialNotification({
        ctx,
        payload: {
          moduleId: createHakiApplication.id,
          MODULE_TYPE: jenis,
          MODULE_TYPE_CODE: jenis.toLowerCase(),
          notifDescription: `Pengajuan ${capitalizeFirstLetter(
            jenis
          )} - ${judul}`,
          STATUS_TYPE: STATUS.PROCESSED,
          relatedUserData: mahasiswaData,
        },
      });

      return {
        message: `${ADD_SUCCESS} ${capitalizeFirstLetter(jenis)}!`,
      };
    } catch (error) {}
  });

export default addHakiHandler;
