/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useGlobalContext } from "~/common/context/GlobalContext";
import { useForm } from "react-hook-form";
import { type IUserProfileForm, userProfileForm } from "~/common/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserProfileType } from "~/server/queries/module/user/user.query";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { customToast } from "~/common/components/ui/toast/showToast";
import { ActionReducer } from "~/common/types/context/GlobalContextType";
import { type AllMasterDataProdiType } from "~/server/api/module/master-data/prodi";
import { type SingleValue } from "react-select";
import { type ReactSelectOptionType } from "~/common/components/ui/form/ReactSelect";
import { useCurrentUser } from "~/common/hooks/module/profile";
import ProfilePhoto from "../../../../../public/profile.jpg";
import {
  userProfilePhoto,
  type IUserProfilePhoto,
  adminProfileForm,
} from "~/common/schemas/user/user-profile.schema";
import { handleUploadCloudinary } from "~/common/libs/handle-upload-cloudinary";
import { JSONtoString } from "~/common/helpers/parseJSON";
import { type StaticImageData } from "next/image";
import { useSession } from "next-auth/react";
const useProfile = () => {
  const {
    state: { user },
    dispatch,
  } = useGlobalContext();
  const { data } = useSession();
  const { isAdmin } = useCurrentUser();
  const isGoogleProvider = user?.accounts?.[0]?.provider === "google";
  const [executed, setExecuted] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [previewPhoto, setPreviewPhoto] = useState<
    string | StaticImageData | undefined
  >(undefined);
  const [initial, setInitial] = useState<boolean>(false);
  const { mutate: updateUserPhoto } = api.user.updateUserPhoto.useMutation();

  // ** FAKULTAS STATE
  const [fakultasState, setFakultasState] = useState<{
    id: string | undefined;
    name: string | undefined;
  }>({
    id: user?.prodi?.Fakultas?.id,
    name: user?.prodi?.Fakultas?.name,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: updateUserProfile } =
    api.user.updateUserProfile.useMutation();
  const { data: prodi } = api.prodi.getAllProdi.useQuery();

  const {
    register: registerUploadProfile,
    handleSubmit: handleSubmitUploadProfile,
    reset: resetUploadForm,
    formState: { errors: errorsUploadProfile },
  } = useForm<IUserProfilePhoto>({
    resolver: zodResolver(userProfilePhoto),
  });

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserProfileForm>({
    resolver: zodResolver(isAdmin ? adminProfileForm : userProfileForm),
  });

  const handleDefaultForm = (user: UserProfileType) => {
    // Define a type for the allowed keys
    type UserKey = keyof IUserProfileForm;

    // Set default values from API response
    Object.entries(user).forEach(([key, value]) => {
      // Cast the key to the allowed type
      const userKey = key as UserKey;
      const valueKey = value as string;
      setValue(userKey, valueKey);
    });
  };

  // ** HANDLE DEFAULT FORM VALUE
  useEffect(() => {
    if (user && !executed) {
      handleDefaultForm(user);
      setExecuted(true);
    }
  }, [setValue, user]);

  // ** HANDLE FAKULTAS STATE WHEN PRODI WAS CHANGE
  const handleFakultasChange = (
    selectState: SingleValue<ReactSelectOptionType>
  ) => {
    const tempProdi: AllMasterDataProdiType = prodi as AllMasterDataProdiType;
    const filteredProdi: AllMasterDataProdiType = tempProdi?.filter(
      (val) => val.id === selectState?.value
    );
    setFakultasState({
      id: filteredProdi[0]?.Fakultas?.id,
      name: filteredProdi[0]?.Fakultas?.name,
    });
  };

  const onSubmit = (userPayload: IUserProfileForm) => {
    setLoading(true);
    updateUserProfile(userPayload, {
      onSuccess: (data) => {
        customToast("success", data?.message);
        dispatch({
          type: ActionReducer.UPDATE_USER,
          payload: data.data as unknown as UserProfileType,
        });
        handleDefaultForm(data as unknown as UserProfileType);
        setLoading(false);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setLoading(false);
      },
    });
  };

  const handleDisabledNbiForm = () => {
    if (isAdmin) return true;

    return !isGoogleProvider;
  };

  const handleUserProfile = () => {
    if ((user?.imageMeta as PrismaJson.FileResponse)?.secure_url) {
      return (user?.imageMeta as PrismaJson.FileResponse)?.secure_url;
    }

    if (user?.image) return user?.image;
    if (data?.user.image) return data?.user.image;

    return ProfilePhoto;
  };

  useEffect(() => {
    if (user && !initial) {
      setPreviewPhoto(handleUserProfile());
      setInitial(true);
    }
  }, [user]);

  const onUpdateProfile = async (approvePayload: IUserProfilePhoto) => {
    setLoadingUpload(true);
    const uploadDokumenProfilePhoto = handleUploadCloudinary({
      file: approvePayload?.profilePhoto?.[0] as unknown as File,
      previusFileId: (user?.imageMeta as PrismaJson.FileResponse)?.public_id,
    });

    const [uploadProfilePhoto] = await Promise.all([uploadDokumenProfilePhoto]);
    const profilePhotoMeta = JSONtoString(uploadProfilePhoto);

    updateUserPhoto(
      { profilePhoto: profilePhotoMeta },
      {
        onSuccess: (data) => {
          dispatch({
            type: ActionReducer.UPDATE_USER,
            payload: data.data as unknown as UserProfileType,
          });
          customToast("success", data?.message);
          setLoadingUpload(false);
          resetUploadForm();
        },
        onError: (error) => {
          customToast("error", error?.message);
          setLoadingUpload(false);
        },
      }
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const currentfile = e.target.files?.[0];
      if (currentfile) {
        const reader = new FileReader();

        reader.onload = () => {
          setPreviewPhoto(reader.result as string);
        };
        reader.readAsDataURL(currentfile);
      }
    } else {
      setPreviewPhoto(undefined);
      resetUploadForm();
      setPreviewPhoto(handleUserProfile());
    }
  };
  const handleCancelUpload = () => {
    resetUploadForm();
    setPreviewPhoto(handleUserProfile());
  };

  const INFORMASI_LOGIN = [
    {
      className: "col-span-2 lg:col-span-1",
      placeholder: "Nama Mahasiwa",
      label: "Nama Lengkap",
      register: { ...register("name") },
      error: errors.name?.message,
    },
    {
      disabled: handleDisabledNbiForm(),
      className: "col-span-2 lg:col-span-1",
      placeholder: "Nomor Induk Mahasiswa",
      label: "NBI",
      register: { ...register("npm") },
      error: errors.npm?.message,
    },
    {
      disabled: true,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Fakultas",
      label: "Fakultas",
      type: "select",
      value: fakultasState?.id,
      control: control,
      selectData: [
        {
          id: fakultasState?.id,
          title: fakultasState?.name,
        },
      ],
    },
    {
      disabled: isAdmin,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Prodi",
      label: "Prodi",
      type: "select",
      isLoading: !prodi,
      value: user?.prodi?.id,
      control: control,
      register: { ...register("prodiId") },
      handleSelectOptionChange: handleFakultasChange,
      selectData: prodi || [
        {
          id: user?.prodi?.id,
          title: user?.prodi?.name,
        },
      ],
      error: errors.prodiId?.message,
    },
    {
      disabled: isAdmin,
      className: "col-span-2 lg:col-span-1",
      placeholder: "ex: 8386657199",
      leftAddonComponent: "+62",
      label: "No Telepon",
      additionalInfo: "No Telepon yang aktif memakai Whatsapp",
      register: { ...register("phone") },
      error: errors.phone?.message,
    },
    {
      disabled: isAdmin,
      className: "col-span-2 lg:col-span-1",
      placeholder: "Semester",
      label: "Semester",
      register: { ...register("semester") },
      error: errors.semester?.message,
    },
    {
      disabled: isAdmin,
      className: "col-span-2",
      placeholder: "Alamat Lengkap",
      label: "Alamat Lengkap",
      type: "textarea",
      register: { ...register("alamat") },
      error: errors.alamat?.message,
    },
  ];

  return {
    handleSubmit,
    onSubmit,
    loading,
    isShow,
    setIsShow,
    INFORMASI_LOGIN,
    handleUserProfile,
    onUpdateProfile,
    loadingUpload,
    registerUploadProfile,
    handleSubmitUploadProfile,
    errorsUploadProfile,
    handleFileSelect,
    previewPhoto,
    handleCancelUpload,
  };
};

export { useProfile };
