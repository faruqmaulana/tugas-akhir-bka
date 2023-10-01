import { type NextApiResponse, type NextApiRequest } from "next";
import methodNotAllowed from "~/common/handler/methodNotAllowed";
import { isTokenExpired } from "~/common/libs/isTokenExpired";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";
import { asiaJakartaTimezone } from "~/common/helpers/asiaJakartaTimezone";
interface MyCustomRequestBody extends NextApiRequest {
  body: {
    email: string;
    token: string;
  };
}

export default async function handler(
  req: MyCustomRequestBody,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") return methodNotAllowed(res);
    const { email, token } = req.body;

    const isExpired = isTokenExpired(token);
    if (isExpired)
      return res.json({
        status: "error",
        code: 401,
        message: "Token kadaluarsa",
      });

    const user = await prisma?.user.findFirst({
      where: { email },
    });

    if (!user)
      return res.json({
        status: "error",
        code: 404,
        message: "Email belum terdaftar",
      });

    // ** HANDLE IF THE ACCOUNT IS ALREADY ACTIVE */
    if (user.isActive)
      return res.json({
        status: "error",
        code: 200,
        message: "Email Anda Sudah Diverifikasi",
      });

    jwt.verify(user?.token as string, env.NEXTAUTH_SECRET as string);

    await prisma?.user.update({
      where: { email },
      data: {
        emailVerified: asiaJakartaTimezone(),
        isActive: true,
      },
    });

    return res.json({
      status: "ok",
      code: 200,
      message: "Aktivasi akun berhasil",
    });
  } catch (error) {
    return res.json({
      status: "error",
      code: 500,
      message: "Token tidak valid",
    });
  }
}
