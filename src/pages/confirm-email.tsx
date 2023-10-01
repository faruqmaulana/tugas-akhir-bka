/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { useEffect, useState } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import SendMail from "~/common/components/svg/SendMail";
import { Button } from "~/common/components/ui/button";
import Text from "~/common/components/ui/text/Text";
import { customToast } from "~/common/components/ui/toast/showToast";
import { RESET_EMAIL_COUNTDOWN } from "~/common/constants";
import { EMAIL_SERVICES } from "~/common/constants/API";
import { EMAIL_TYPE } from "~/common/enums/EMAIL_TYPE";
import { postRequest } from "~/common/services/base";
import { type GlobalApiResType } from "~/common/types/GlobalApiResType";

export type VerifyEmailType = {
  status: "error" | "ok";
  message: string;
};

export type ResponseEmailVerificationData = { email: string; token: string };

export type ConfirmEmailProps = ResponseEmailVerificationData;

export const getServerSideProps = requireAuth(async (ctx) => {
  const { email, token } = ctx.query;

  return { props: { email, token } };
});

export default function ConfirmEmail(props: ConfirmEmailProps) {
  const { email } = props;

  const [seconds, setSeconds] = useState<number>(RESET_EMAIL_COUNTDOWN);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResendEMail = async () => {
    const request = await postRequest<GlobalApiResType>(EMAIL_SERVICES, {
      email,
      type: EMAIL_TYPE.RESEND_EMAIL_VERIFICATION,
    });

    customToast(request.status !== "ok" ? "error" : "success", request.message);
    setLoading(false);
    setSeconds(RESET_EMAIL_COUNTDOWN);
  };

  useEffect(() => {
    customToast(
      "success",
      "Cek email Anda untuk melanjutkan proses verifikasi"
    );
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalId!);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [seconds]);

  return (
    <>
      <div className="ml-auto mr-auto flex flex-col items-center justify-center gap-4 px-5">
        <Text className="text-center">Mohon verifikasi email anda</Text>
        <Text className="text-center !text-lg font-semibold">
          {" "}
          Email telah dikirimkan ke <span>{email || ""}</span>
        </Text>
        <SendMail />
        <Button
          isMedium
          isSecondary
          className="px-5"
          disabled={seconds > 0 || loading}
          isLoading={loading}
          // intent="yellow"
          onClick={() => {
            if (seconds === 0) {
              setLoading(true);
              void handleResendEMail();
            }
          }}
        >
          Kirim ulang link verifikasi
        </Button>
        <p className="text-center text-black">
          Tidak menerima link verifikasi?&nbsp;
          <span className="text-orange-500">
            Kirim ulang dalam {seconds} detik
          </span>
        </p>
      </div>
    </>
  );
}
