/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from "next/image";
import { requireAuth } from "~/common/authentication/requireAuth";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { useProfile } from "~/common/hooks/module/profile/useProfile";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const ProfilePage = () => {
  const {
    handleSubmit,
    onSubmit,
    loading,
    isShow,
    setIsShow,
    INFORMASI_LOGIN,
    onUpdateProfile,
    loadingUpload,
    registerUploadProfile,
    handleSubmitUploadProfile,
    errorsUploadProfile,
    handleFileSelect,
    previewPhoto,
    handleCancelUpload
  } = useProfile();

  return (
    <>
      <PageHeading />
      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <div className="relative flex h-fit flex-col items-center gap-5 rounded-md bg-white p-5 shadow-md transition-all fade-out duration-300 md:w-72 md:p-8 md:!pb-6">
          <div className="relative h-56 w-full overflow-hidden rounded-md sm:h-56 md:w-56">
            {previewPhoto && (
              <Image
                fill
                priority
                quality={100}
                src={previewPhoto}
                alt="profile"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-pencil-square absolute right-2 top-2 cursor-pointer"
            viewBox="0 0 16 16"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          <form
            onSubmit={handleSubmitUploadProfile(onUpdateProfile)}
            className={`flex flex-col gap-4 transition-all fade-out duration-300 ${
              isShow ? "block" : "hidden"
            }`}
          >
            <input
              className="focus:shadow-te-primary dark:file:bg-grey-900 w-full rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700  transition-all duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-900 dark:file:text-neutral-700 dark:focus:border-primary"
              type="file"
              id="formFile"
              accept="image/*"
              {...registerUploadProfile("profilePhoto")}
              onChange={handleFileSelect}
            />
            {errorsUploadProfile.profilePhoto?.message && (
              <p className="-mb-2 -mt-3 text-sm text-red-500">
                {String(errorsUploadProfile.profilePhoto?.message)}
              </p>
            )}
            <div className="flex flex-row ml-auto gap-3">
              <Button onClick={handleCancelUpload} isGray isMedium className="rounded-lg">
                Batal
              </Button>
              <Button
                isSubmit
                isPrimary
                isMedium
                isLoading={loadingUpload}
                className="rounded-lg"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Card header="Informasi Profile" headerClassName="mb-5">
            <BaseForm data={INFORMASI_LOGIN} />
            <Button
              isSubmit
              isSuccess
              isMedium
              isLoading={loading}
              className="ml-auto mt-4 flex"
            >
              Simpan
            </Button>
          </Card>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
