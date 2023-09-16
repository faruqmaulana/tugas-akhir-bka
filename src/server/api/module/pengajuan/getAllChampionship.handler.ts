import { changeDateFormat } from "~/common/helpers/changeDateFormat";
import { protectedProcedure } from "../../trpc";

const getAllChampionshipHandler = protectedProcedure.query(async ({ ctx }) => {
  try {
    const prestasiData = await ctx.prisma.pengajuanOnUsers.findMany({
      where: {
        NOT: { prestasiDataTableId: null },
      },
      orderBy: {
        PrestasiDataTable: { updatedAt: "desc" },
      },
      include: {
        PrestasiDataTable: {
          include: {
            lampiran: true,
            orkem: true,
            tingkatKejuaraan: true,
            tingkatPrestasi: true,
            activityLog: true,
          },
        },
        dosen: { select: { name: true, nidn: true } },
        user: { select: { name: true, prodi: true } },
      },
    });

    const transformedPrestasiData = prestasiData.map((data) => ({
      id: data.PrestasiDataTable?.id || "-",
      nama: data.user.name || "-",
      noSK: data.PrestasiDataTable?.noSK || "-",
      tanggalSK: changeDateFormat(data.PrestasiDataTable?.tanggalSK),
      kegiatan: data.PrestasiDataTable?.kegiatan || "-",
      tanggalKegiatan: changeDateFormat(
        data.PrestasiDataTable?.tanggalKegiatan
      ),
      penyelenggara: data.PrestasiDataTable?.penyelenggara || "-",
      orkem: data.PrestasiDataTable?.orkem.name || "-",
      tingkatKejuaraan: data.PrestasiDataTable?.tingkatKejuaraan.name || "-",
      tingkatPrestasi: data.PrestasiDataTable?.tingkatPrestasi.name || "-",
      dosen: data.dosen.name || "-",
      piagamPenghargaan:
        (
          data.PrestasiDataTable?.lampiran
            .piagamPenghargaan as PrismaJson.FileResponse
        )?.secure_url || "-",
      fotoPenyerahanPiala:
        (
          data.PrestasiDataTable?.lampiran
            .fotoPenyerahanPiala as PrismaJson.FileResponse
        )?.secure_url || "-",
      undanganKejuaraan:
        (
          data.PrestasiDataTable?.lampiran
            .undanganKejuaraan as PrismaJson.FileResponse
        )?.secure_url || "-",
      dokumenPendukung:
        (
          data.PrestasiDataTable?.lampiran
            .dokumenPendukung as PrismaJson.FileResponse
        )?.secure_url || "-",
      keterangan: data.keterangan || "-",
      status: data.PrestasiDataTable?.status || "-",
    }));

    return transformedPrestasiData;
  } catch (error) {
    return error;
  }
});

export default getAllChampionshipHandler;
