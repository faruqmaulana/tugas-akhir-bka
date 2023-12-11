import nodemailer from "nodemailer";
import { type NextApiResponse, type NextApiRequest } from "next";
import methodNotAllowed from "~/common/handler/methodNotAllowed";
import { emailHandler } from "~/common/handler/emailHandler";
import { generateToken } from "~/common/libs/generateToken";

export type BodyType = {
  targetName: string;
  email: string;
  type:
    | "CONFIRM"
    | "VERIFY"
    | "RESEND_EMAIL_VERIFICATION"
    | "SEND_RESET_PASSWORD";
  token: string;
  res: NextApiResponse;
};

interface MyCustomRequestBody extends NextApiRequest {
  body: BodyType;
}

export default async function handler(
  req: MyCustomRequestBody,
  res: NextApiResponse
) {
  try {
    const { email, type, token = generateToken({ email }) } = req.body;

    if (req.method !== "POST") return methodNotAllowed(res);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailPayload = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
    };

    const mailOption = await emailHandler({ ...req.body, token, res });
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(
        { ...mailPayload, ...mailOption },
        (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        }
      );
    });

    return res.json({
      status: "ok",
      code: 200,
      message: handleEmailTypeMessage(type),
      data: {
        token,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Failed to Send Email" });
  }
}

const handleEmailTypeMessage = (type: BodyType["type"]) => {
  if (type === "CONFIRM") return "Email berhasil dikirim";
  if (type === "RESEND_EMAIL_VERIFICATION")
    return "Email aktivasi berhasil dikirim ulang";
  if (type === "SEND_RESET_PASSWORD")
    return "Permintaan reset password berhasil dikirim, silahkan cek email anda";
};
