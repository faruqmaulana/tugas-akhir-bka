import { useGlobalContext } from "~/common/context/GlobalContext";
import { useForm } from "react-hook-form";
import { type IUserProfileForm, userProfileForm } from "~/common/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserProfileType } from "~/server/queries/module/user/user.query";
import { useCallback, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { customToast } from "~/common/components/ui/toast/showToast";
import { ActionReducer } from "~/common/types/context/GlobalContextType";
import { type AllMasterDataProdiType } from "~/server/api/module/master-data/prodi";
import { type SingleValue } from "react-select";
import { type ReactSelectOptionType } from "~/common/components/ui/form/ReactSelect";

const useProfile = () => {
  const {
    state: { user },
    dispatch,
  } = useGlobalContext();

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
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserProfileForm>({
    resolver: zodResolver(userProfileForm),
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
    if (user) {
      handleDefaultForm(user);
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

  const onSubmit = useCallback((userPayload: IUserProfileForm) => {
    setLoading(true);
    updateUserProfile(userPayload, {
      onSuccess: (data) => {
        customToast("success", data?.message);
        dispatch({
          type: ActionReducer.UPDATE_USER,
          payload: data.data as unknown as UserProfileType,
        });
        setLoading(false);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setLoading(false);
      },
    });
  }, []);

  const INFORMASI_LOGIN = [
    {
      className: "col-span-2 lg:col-span-1",
      placeholder: "Nama Mahasiwa",
      label: "Nama Lengkap",
      register: { ...register("name") },
      error: errors.name?.message,
    },
    {
      className: "col-span-2 lg:col-span-1",
      placeholder: "Nomor Induk Mahasiswa",
      label: "NBI",
      disabled: true,
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
    },
    {
      className: "col-span-2 lg:col-span-1",
      placeholder: "ex: 8386657199",
      leftAddonComponent: "+62",
      label: "No Telepon",
      additionalInfo: "No Telepon yang aktif memakai Whatsapp",
      register: { ...register("phone") },
      error: errors.phone?.message,
    },
    {
      className: "col-span-2 lg:col-span-1",
      placeholder: "Semester",
      label: "Semester",
      register: { ...register("semester") },
      error: errors.semester?.message,
    },
    {
      className: "col-span-2 lg:mt-3",
      placeholder: "Alamat Lengkap",
      label: "Alamat Lengkap",
      type: "textarea",
      register: { ...register("alamat") },
      error: errors.alamat?.message,
    },
  ];

  return { handleSubmit, onSubmit, loading, INFORMASI_LOGIN };
};

export { useProfile };
