import { type NextApiResponse, type NextApiRequest } from "next";
import methodNotAllowed from "~/common/handler/methodNotAllowed";
import { isTokenExpired } from "~/common/libs/isTokenExpired";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";
import { hash } from "argon2";
import prisma from "~/common/config/prisma";

interface MyCustomRequestBody extends NextApiRequest {
  body: {
    email: string;
    token: string;
    password: string;
  };
}

export default async function handler(
  req: MyCustomRequestBody,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") return methodNotAllowed(res);
    const { email, token, password } = req.body;

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

    if (!user.token)
      return res.json({
        status: "error",
        code: 500,
        message: "Token tidak valid",
      });

    jwt.verify(user.token, env.NEXTAUTH_SECRET as string);

    await prisma?.user.update({
      where: { email },
      data: {
        password: await hash(password),
        token: null,
      },
    });

    return res.json({
      status: "ok",
      code: 200,
      message: "Reset password berhasil",
    });
  } catch (error) {
    return res.json({
      status: "error",
      code: 500,
      message: "Token tidak valid",
    });
  }
}
