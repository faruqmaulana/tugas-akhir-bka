import nodemailer from "nodemailer";
import { type NextApiResponse, type NextApiRequest } from "next";
import sessionMiddleware from "~/common/libs/sessionMiddleware";
import methodNotAllowed from "~/common/handler/methodNotAllowed";

interface MyCustomRequestBody extends NextApiRequest {
  body: {
    targetName: string;
    targetUserEmail: string;
  };
}

export default async function handler(
  req: MyCustomRequestBody,
  res: NextApiResponse
) {
  try {
    // await sessionMiddleware(req, res);
    if (req.method !== "POST") return methodNotAllowed(res);
    const { targetName, targetUserEmail } = req.body;

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

    const mailOption = {
      from: process.env.NODEMAILER_EMAIL,
      to: targetUserEmail,
      subject: "Verify Account",
      html: `
        <p>Hello ${targetName} click link bellow to active your account: <a href="https://fm-space.vercel.app/"><b>Link</b></a></p>
        `,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOption, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    return res.json({ status: 200, message: "Email Sent Successfully" });
  } catch (error) {
    console.log({ error });
    return res.json({ status: 500, message: "Failed to Send Email" });
  }
}
