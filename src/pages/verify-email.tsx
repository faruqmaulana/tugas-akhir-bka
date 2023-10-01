/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { useEffect, useState } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import { customToast } from "~/common/components/ui/toast/showToast";
import { type ResponseEmailVerificationData } from "./confirm-email";
import Text from "~/common/components/ui/text/Text";
import { postRequest } from "~/common/services/base";
import { VERIFY_EMAIL } from "~/common/constants/API";
import SendMail from "~/common/components/svg/SendMail";
import { type GlobalApiResType } from "~/common/types/GlobalApiResType";
import { Button } from "~/common/components/ui/button";
import { useRouter } from "next/router";
import { REDIRECT_LOGIN_COUNTDOWN } from "~/common/constants";

type VerifyEmailPropsType = {
  data: Omit<GlobalApiResType, "data">;
} & ResponseEmailVerificationData;

export const getServerSideProps = requireAuth(async (ctx) => {
  const { email, token } = ctx.query;

  const data = await postRequest<GlobalApiResType>(VERIFY_EMAIL, {
    email,
    token,
  });
  return { props: { data, email } };
});

export default function Home(props: VerifyEmailPropsType) {
  const { data, email } = props;
  const router = useRouter();
  const [seconds, setSeconds] = useState(REDIRECT_LOGIN_COUNTDOWN);

  useEffect(() => {
    const { status } = data;
    customToast(status !== "ok" ? "error" : "success", data.message);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalId!);
      void router.push("/");
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
        <Text className="text-center !text-2xl !leading-9">
          Mohon Tunggu, Email Anda Dalam Proses Verifikasi
        </Text>
        <SendMail />
        <Button
          isMedium
          isSecondary
          className="px-5"
          onClick={() => {
            void router.push("/");
          }}
        >
          Kembali ke halaman Login
        </Button>
        <p className="text-center text-black">
          Anda akan otomatis kembali ke halaman Login dalam&nbsp;
          <span className="text-orange-500">{seconds} detik</span>
        </p>
      </div>
    </>
  );
}
