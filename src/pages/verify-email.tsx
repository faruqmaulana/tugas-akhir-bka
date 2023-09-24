/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import axios from "axios";
import { useEffect } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { customToast } from "~/common/components/ui/toast/showToast";
import { getBaseUrl } from "~/utils/api";

export type VerifyEmailType = {
  status: 200 | 500;
  message: string;
};

export const getServerSideProps = requireAuth(async (ctx) => {
  const { email, token } = ctx.query;

  const { data } = await axios.post<VerifyEmailType>(
    `${getBaseUrl()}/api/services/verify-email`,
    {
      email,
      token,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return { props: { data } };
});

export default function Home(props: { data: VerifyEmailType }) {
  const { data } = props;

  useEffect(() => {
    alert(1);
    const failed = data.status === 500;
    console.log("data.status", data.status);
    customToast(failed ? "error" : "success", data.message);
  }, []);

  return (
    <>
      <PageHeading />
      <Card header="Verify Email">
        <p>Halo</p>
      </Card>
    </>
  );
}
