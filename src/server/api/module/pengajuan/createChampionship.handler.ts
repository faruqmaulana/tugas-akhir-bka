/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { protectedProcedure } from "../../trpc";
import { handleDocumentMetaToJSON } from "~/common/libs/handle-document-data";
import { MOUDLE_KEJUARAAN } from "~/common/constants/MESSAGE";
import { STATUS } from "~/common/enums/STATUS";
import { ADD_PRESTASI_LOMBA_SUCCESS } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "./_router";
import handleAddInitialNotification from "../notification/handleAddInitialNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";

const createChampionshipHandler = protectedProcedure
  .input(pengajuanPrestasiForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        // THESE LAMPIRAN PAYLOAD
        dokumenPendukung,
        fotoPenyerahanPiala,
        piagamPenghargaan,
        undanganKejuaraan,

        // PRESTASI DATA TABLE PAYLOAD
        kegiatan,
        tanggalKegiatan,
        penyelenggara,
        dosenId,
        orkemId,
        tingkatKejuaraanId,
        tingkatPrestasiId,

        // PENGAJUAN ON USER PAYLOAD
        users,
        currentUserName,
      } = input;

      // ** CREATE A LAMPIRAN DATA FIRST TO GET A LAMPIRAN ID
      const createLampiran = await ctx.prisma.lampiranData.create({
        data: handleDocumentMetaToJSON({
          dokumenPendukung,
          fotoPenyerahanPiala,
          piagamPenghargaan,
          undanganKejuaraan,
        }),
      });

      // ** CREATE NEW PRESTASI DATA TABLE AND GET THE DATA ID
      const createPrestasiDataTable = await ctx.prisma.prestasiDataTable.create(
        {
          data: {
            kegiatan,
            tanggalKegiatan,
            penyelenggara,
            dosenId,
            orkemId,
            tingkatKejuaraanId,
            tingkatPrestasiId,
            lampiranId: createLampiran.id,
            createdById: ctx.session.user.userId,
          },
        }
      );

      // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON PRETASI DATA TABLE AND USERS
      const createPengajuanOnUsers =
        await ctx.prisma.pengajuanOnUsers.createMany({
          data: users.map((val) => {
            return {
              dosenId,
              userId: val.value,
              keterangan: val.isKetua ? "Ketua Tim" : "Anggota",
              prestasiDataTableId: createPrestasiDataTable.id,
            };
          }),
        });

      //** HANDLE ADD INITIAL NOTIFICATION */
      await handleAddInitialNotification({
        ctx,
        payload: {
          moduleId: createPrestasiDataTable.id,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.KEJUARAAN,
          MODULE_TYPE: MOUDLE_KEJUARAAN,
          STATUS_TYPE: STATUS.PROCESSED,
          notifDescription: `Pengajuan Prestasi - ${createPrestasiDataTable.kegiatan}`,
          relatedUserData: users,
        },
      });

      return {
        message: ADD_PRESTASI_LOMBA_SUCCESS,
        data: createPengajuanOnUsers,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default createChampionshipHandler;
