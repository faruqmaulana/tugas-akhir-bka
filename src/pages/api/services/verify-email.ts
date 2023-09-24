import { type NextApiResponse, type NextApiRequest } from "next";
import methodNotAllowed from "~/common/handler/methodNotAllowed";
import { isTokenExpired } from "~/common/libs/isTokenExpired";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";
interface MyCustomRequestBody extends NextApiRequest {
  body: {
    email: string;
    token: string;
  };
}

export default function handler(
  req: MyCustomRequestBody,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") return methodNotAllowed(res);
    const { email, token } = req.body;

    const isExpired = isTokenExpired(token);
    if (isExpired)
      return res.json({
        status: 500,
        message:
          "Account activation failed because the token has expired. Please request a new activation token to proceed",
      });

    jwt.verify(token, env.NEXTAUTH_SECRET as string);

    return res.json({
      status: 200,
      message: "Your account is now active and ready to use!",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message:
        "Account activation failed because the token has expired. Please request a new activation token to proceed",
    });
  }
}
