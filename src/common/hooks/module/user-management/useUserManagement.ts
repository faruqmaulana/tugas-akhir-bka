import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type SingleValue } from "react-select";
import { type ReactSelectOptionType } from "~/common/components/ui/form/ReactSelect";
import { customToast } from "~/common/components/ui/toast/showToast";
import {
  INITIAL_MODAL_STATE,
  type ModalStateType,
} from "~/common/constants/ui/MODAL";
import {
  type IAdminManagementForm,
  adminManagementForm,
  type IMahasiswaManagementForm,
  mahasiswaManagementForm,
} from "~/common/schemas/module/master-data/user-management.schema";
import { type AllMasterDataProdiType } from "~/server/api/module/master-data/prodi";
import { type allStudentTableType } from "~/server/api/module/user/user";
import { api } from "~/utils/api";

const useUserManagement = () => {
  const { data: prodi } = api.prodi.getAllProdi.useQuery();
  const { data: allUsers, refetch: refetchUsers } =
    api.user.getAllUsers.useQuery<allStudentTableType[]>();
  const { mutate: mutateAddMahasiswa } = api.user.addMahasiswa.useMutation();
  const { mutate: mutateAddAdmin } = api.user.addAdmin.useMutation();

  const [tab, setTab] = useState<Role>("MAHASISWA");
  const [initial, setInitial] = useState<boolean>(true);
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);
  const [usersState, setUsersState] = useState<
    allStudentTableType[] | undefined
  >(undefined);

  // ** FAKULTAS STATE
  const [fakultasState, setFakultasState] = useState<{
    id: string | undefined;
    name: string | undefined;
  }>();

  const handleFilterUserState = (role: Role) => {
    if (allUsers) {
      const copyUsers = [...allUsers];
      const filteredUsersData = copyUsers?.filter((val) => val.role === role);

      setUsersState(filteredUsersData);
    }
  };

  const handleActiveMahasiswaTab = () => {
    setTab(Role.MAHASISWA);
    handleFilterUserState(Role.MAHASISWA);
  };

  const handleActiveAdminTab = () => {
    setTab(Role.ADMIN);
    handleFilterUserState(Role.ADMIN);
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

  useEffect(() => {
    if (allUsers && initial) {
      setUsersState(allUsers?.filter((val) => val.role === "MAHASISWA"));
      setInitial(false);
    }
  }, [allUsers, initial]);

  // ** FORM STATE */
  //* ADD STATE */
  const {
    register,
    setValue,
    handleSubmit: handleAddMahasiswa,
    control,
    reset: resetAddUserForm,
    formState: { errors: errorsAddMahasiswaForm },
  } = useForm<IMahasiswaManagementForm>({
    resolver: zodResolver(mahasiswaManagementForm),
  });

  const {
    register: registerAdmin,
    handleSubmit: handleAddAdmin,
    reset: resetAdminForm,
    formState: { errors: errorsAdminForm },
  } = useForm<IAdminManagementForm>({
    resolver: zodResolver(adminManagementForm),
  });

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

  // ** MODAL ACTION */
  const handleAdd = () => {
    resetAdminForm();
    resetAddUserForm();
    setFakultasState(undefined);
    setModalState({ ...INITIAL_MODAL_STATE, isAddModalOpen: true });
  };

  //* ADD MAHASISWA */
  const onSubmitAddMahasiswa = (userPaylod: IMahasiswaManagementForm) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    mutateAddMahasiswa(userPaylod, {
      onSuccess: (data) => {
        void refetchUsers().then((_val) => handleFilterUserState("MAHASISWA"));
        customToast("success", data.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isAddLoading: false }));
      },
    });
  };

  //* ADD ADMIN */
  const onSubmitAddAdmin = (userPaylod: IAdminManagementForm) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    mutateAddAdmin(userPaylod, {
      onSuccess: (data) => {
        void refetchUsers().then((_val) => handleFilterUserState("ADMIN"));
        customToast("success", data.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isAddLoading: false }));
      },
    });
  };

  //** ADD FORM */
  const ADD_MAHASISWA = [
    {
      className: "col-span-2",
      placeholder: "Nama Mahasiwa",
      label: "Nama Lengkap",
      register: { ...register("name") },
      error: errorsAddMahasiswaForm.name?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Nomor Induk Mahasiswa",
      label: "NBI",
      register: { ...register("npm") },
      error: errorsAddMahasiswaForm.npm?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Email",
      label: "Email",
      register: { ...register("email") },
      error: errorsAddMahasiswaForm.email?.message,
    },
    {
      disabled: true,
      className: "col-span-2",
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
      className: "col-span-2",
      placeholder: "Prodi",
      label: "Prodi",
      type: "select",
      isLoading: !prodi,
      // value: user?.prodi?.id,
      control: control,
      register: { ...register("prodiId") },
      handleSelectOptionChange: handleFakultasChange,
      selectData: prodi,
      error: errorsAddMahasiswaForm.prodiId?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Semester",
      label: "Semester",
      register: { ...register("semester") },
      error: errorsAddMahasiswaForm.semester?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Password",
      label: "Password",
      register: { ...register("password") },
      error: errorsAddMahasiswaForm.name?.message,
    },
  ];

  const ADD_ADMIN = [
    {
      className: "col-span-2",
      placeholder: "Nama Admin",
      label: "Nama Lengkap",
      register: { ...registerAdmin("name") },
      error: errorsAdminForm.name?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Email",
      label: "Email",
      register: { ...registerAdmin("email") },
      error: errorsAdminForm.name?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Password",
      label: "Password",
      register: { ...registerAdmin("password") },
      error: errorsAdminForm.name?.message,
    },
  ];

  return {
    ADD_MAHASISWA,
    handleAdd,
    modalState,
    handleClose,
    tab,
    handleActiveMahasiswaTab,
    handleActiveAdminTab,
    usersState,
    ADD_ADMIN,
    onSubmitAddMahasiswa,
    handleAddMahasiswa,
    handleAddAdmin,
    onSubmitAddAdmin,
  };
};

export { useUserManagement };
