import { hash } from "argon2";
import { EMAIL_TYPE } from "~/common/enums/EMAIL_TYPE";
import errorDuplicateData from "~/common/handler/errorDuplicateData";
import { generateToken } from "~/common/libs/generateToken";
import { registerSchema } from "~/common/schemas/module/register/register.schema";
import { publicProcedure } from "~/server/api/trpc";
import { getBaseUrl } from "~/utils/api";

const registerNewUserHandler = publicProcedure
  .input(registerSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { npm, email, password, name } = input;

      //** CHECK NPM DUPLO */
      const isNpmAlreadyExist = await ctx.prisma.user.findUnique({
        where: {
          npm,
        },
      });

      if (isNpmAlreadyExist) {
        errorDuplicateData({ property: "Nomor Induk Mahasiswa" });
      }

      // //** CHECK EMAIL DUPLO */
      const isEmailAlreadyExist = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (isEmailAlreadyExist) {
        errorDuplicateData({ property: "Email" });
      }

      const token = generateToken({ email: email });

      //** REGISTER NEW USER */
      await ctx.prisma.user.create({
        data: { ...input, password: await hash(password), token },
      });

      await fetch(getBaseUrl() + "/api/services/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          targetName: name,
          type: EMAIL_TYPE.CONFIRM,
          token,
        }),
      });

      return {
        message: "Pendaftaran berhasil, silahkan cek email anda",
        data: { email, token },
      };
    } catch (error) {
      throw error;
    }
  });

export default registerNewUserHandler;
