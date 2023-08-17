/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { requireAuth } from "~/common/authentication/requireAuth";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import Input from "~/common/components/ui/form/Input";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useProfile } from "~/common/hooks/module/profile/useProfile";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const ProfilePage = () => {
  const { handleSubmit, onSubmit, loading, INFORMASI_LOGIN } = useProfile();

  return (
    <>
      <PageHeading />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card header="Informasi Profile" headerClassName="mb-5">
          <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5">
            {INFORMASI_LOGIN.map((val) => (
              <Input key={val.label} {...val} />
            ))}
          </div>
          <Button
            isSubmit
            isSuccess
            isMedium
            isLoading={loading}
            className="col-span-1 ml-auto"
          >
            Simpan
          </Button>
        </Card>
      </form>
    </>
  );
};

export default ProfilePage;
