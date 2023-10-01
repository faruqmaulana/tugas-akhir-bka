import { type BodyType } from "~/pages/api/services/email";
import { getBaseUrl } from "~/utils/api";
import { CONFIRM_EMAIL_PAGE, VERIFY_EMAIL_PAGE } from "../constants/routers";
import { EMAIL_TYPE } from "../enums/EMAIL_TYPE";

export type RegisterUserEmailContent = {
  targetName: string;
  email: string;
  token: string;
  redirectTo: string;
  linkText?: string;
};

type LinkPropsType = Omit<RegisterUserEmailContent, "targetName">;

// ** REUSABLE EMAIL LINK MAKER
const handleLink = (props: LinkPropsType) => {
  const { email, token, redirectTo, linkText = "Link" } = props;
  return `<a href="${getBaseUrl()}${redirectTo}?email=${email}&token=${token}"><b>${linkText}</b></a></p>`;
};

export const emailHandler = async (context: BodyType) => {
  const { email, targetName, type, token, res } = context;

  const user = await prisma?.user.findUnique({
    where: {
      email: email,
    },
  });

  // ** HANDLE IF THE ACCOUNT IS ALREADY ACTIVE */
  if (user?.isActive)
    return res.json({
      status: "error",
      code: 200,
      message: "Email Anda Sudah Diverifikasi",
    });

  // ** CONFIRM EMAIL */
  if (type === EMAIL_TYPE.CONFIRM) {
    return {
      subject: "Confirm Email",
      html: `
      <p>Halo <b>${targetName}</b>,</p>
      <br/>
      <p>Terima kasih telah melakukan registrasi akun, untuk menyelesaikan proses pendaftaran Anda, kami perlu melakukan verifikasi akun Anda, silakan klik tautan di bawah ini:
      </p>

      ${handleLink({
        redirectTo: CONFIRM_EMAIL_PAGE,
        email,
        token,
      })}
      
      <p>Tautan di atas akan membawa Anda ke halaman aktivasi akun, setelah proses aktivasi akun berhasil maka anda dapat mengakses semua fitur yang tersedia.</p>

      <p>Jika Anda tidak mendaftar, harap abaikan pesan ini.</p>
      <br/>
      <p>Salam,<br>Admin Biro Kemahasiswaan Untag Surabaya</p>
      `,
    };
  }

  // ** RESEND EMAIL */
  if (type === EMAIL_TYPE.RESEND_EMAIL_VERIFICATION) {
    // ** HANDLE NOT REGISTERED EMAIL*/
    if (!user)
      return res.json({
        status: "error",
        code: 404,
        message: "Email Belum Terdaftar",
      });

    // ** UPDATE TOKEN */
    await prisma?.user.update({
      where: { email: email },
      data: {
        token,
      },
    });

    return {
      subject: "Resend Email Verification",
      html: `
      <p>Halo ${targetName || user.name},</p>
    
      <p>Kami telah menerima permintaan Anda untuk mengirim ulang email verifikasi. Untuk menyelesaikan proses aktivasi akun Anda, silakan klik tautan verifikasi di bawah ini:</p>
      
      ${handleLink({
        redirectTo: VERIFY_EMAIL_PAGE,
        email,
        token,
        linkText: "Tautan Verifikasi Akun",
      })}
      
      <p>Jika Anda tidak meminta pengiriman ulang email verifikasi ini, Anda dapat mengabaikannya dengan aman. Akun Anda tidak akan diaktifkan sampai Anda mengklik tautan verifikasi di atas.</p>
      
      <p>Salam,<br>Admin Biro Kemahasiswaan Untag Surabaya</p>
      `,
    };
  }
};
