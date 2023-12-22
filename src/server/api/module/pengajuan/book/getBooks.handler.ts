import { changeDateFormat } from "~/common/helpers/changeDateFormat";
import { protectedProcedure } from "~/server/api/trpc";

export type AllBooksType = {
  id: string;
  judulBuku: string;
  nomorISBN: string;
  penulis: string;
  pengarang: string;
  penerbit: string;
  tahunTerbit: string;
  jumlahEksemplar: string;
  dokumenPendukung: string;
  dokumenSK: string;
  status: string;
};

const getBooksHandler = protectedProcedure.query(async ({ ctx }) => {
  try {
    const isAdmin = ctx.session.user.role === "ADMIN";
    const getAllBook = await ctx.prisma.buku.findMany({
      where: isAdmin ? {} : { userId: ctx.session.user.userId },
      include: { suratKeputusan: true },
    });
    const transformedBooks = getAllBook.map((val) => {
      return {
        id: val.id,
        judulBuku: val.judulBuku,
        nomorISBN: val.nomorISBN,
        penulis: val.penulis,
        pengarang: val.pengarang,
        penerbit: val.penerbit,
        status: val.status,
        tahunTerbit: changeDateFormat(val.tahunTerbit),
        jumlahEksemplar: val.jumlahEksemplar,
        dokumenPendukung:
          (val?.dokumenPendukung as PrismaJson.FileResponse)?.secure_url || "-",
        dokumenSK:
          (val?.suratKeputusan?.dokumenSK as PrismaJson.FileResponse)
            ?.secure_url || "-",
      };
    });

    return transformedBooks as AllBooksType[];
  } catch (error) {}
});

export default getBooksHandler;
