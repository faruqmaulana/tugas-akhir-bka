import errorDuplicateData from "~/common/handler/duplicateData";
import { registerSchema } from "~/common/schemas/module/register/register.schema";
import { protectedProcedure } from "~/server/api/trpc";

const registerNewUserHandler = protectedProcedure
  .input(registerSchema)
  .mutation(async ({ ctx, input }) => {
    const { npm, phone, email } = input;

    //** CHECK NPM DUPLO */
    await ctx.prisma.user
      .findUniqueOrThrow({
        where: {
          npm,
        },
      })
      .catch(() => errorDuplicateData({ property: "Nomor Induk Mahasiswa" }));

    //** CHECK PHONE DUPLO */
    await ctx.prisma.user
      .findUniqueOrThrow({
        where: {
          phone,
        },
      })
      .catch(() => errorDuplicateData({ property: "Nomor Handphone" }));

    //** CHECK EMAIL DUPLO */
    await ctx.prisma.user
      .findUniqueOrThrow({
        where: {
          email,
        },
      })
      .catch(() => errorDuplicateData({ property: "Email" }));

    //** REGISTER NEW USER */
    await ctx.prisma.user.create({
      data: input,
    });

    return {
      message: "Pendaftaran berhasil, silahkan cek email anda",
      data: "",
    };
  });

export default registerNewUserHandler;
