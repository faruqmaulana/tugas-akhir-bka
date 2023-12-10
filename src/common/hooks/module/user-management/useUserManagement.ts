import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useState } from "react";
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
  type IEditMahasiswaManagementForm,
  editMahasiswaManagementForm,
} from "~/common/schemas/module/master-data/user-management.schema";
import { type AllMasterDataProdiType } from "~/server/api/module/master-data/prodi";
import { type allStudentTableType } from "~/server/api/module/user/user";
import { api } from "~/utils/api";

const useUserManagement = () => {
  const { data: prodi } = api.prodi.getAllProdi.useQuery();
  const { data: allUsers, refetch: refetchUsers } =
    api.user.getAllUsers.useQuery<allStudentTableType[]>();
  const { mutate: mutateAddMahasiswa } = api.user.addMahasiswa.useMutation();
  const { mutate: mutateEditMahasiswa } = api.user.editMahasiswa.useMutation();
  const { mutate: mutateAddAdmin } = api.user.addAdmin.useMutation();
  const [checked, setChecked] = useState<boolean>(false);
  const [tab, setTab] = useState<Role>("MAHASISWA");
  const [modalState, setModalState] =
    useState<ModalStateType>(INITIAL_MODAL_STATE);

  // ** FAKULTAS STATE
  const [fakultasState, setFakultasState] = useState<{
    id: string | undefined;
    name: string | undefined;
  }>();

  const handleActiveMahasiswaTab = () => {
    setTab(Role.MAHASISWA);
  };

  const handleActiveAdminTab = () => {
    setTab(Role.ADMIN);
  };

  const handleClose = () => setModalState(INITIAL_MODAL_STATE);

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
    register: registerEdit,
    setValue: setEditValue,
    handleSubmit: handleSubmitEdit,
    control: editController,
    reset: resetEditUserForm,
    formState: { errors: errorsEditMahasiswaForm },
  } = useForm<IEditMahasiswaManagementForm>({
    resolver: zodResolver(editMahasiswaManagementForm),
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

  const handleEdit = (currentData: allStudentTableType) => {
    // GET FILTERED LECTURER
    const getCurrentUser = allUsers?.filter(
      (val) => val.id === currentData.id
    )[0];

    if (getCurrentUser) {
      setFakultasState({
        id: getCurrentUser?.fakultasId,
        name: getCurrentUser?.fakultas,
      });

      handleDefaultEditValue(getCurrentUser);

      setModalState({ ...INITIAL_MODAL_STATE, isEditModalOpen: true });
    }
  };

  const handleDefaultEditValue = (filteredUser: allStudentTableType) => {
    setEditValue("id", filteredUser?.id);
    setEditValue("prodiId", filteredUser?.prodiId || "");
    setEditValue("name", filteredUser?.name);
    setEditValue("email", filteredUser?.email);
    setEditValue("npm", filteredUser?.npm);
    setEditValue("semester", filteredUser?.name);
    setChecked(filteredUser?.isActive);
  };

  // ** MODAL ACTION */
  const handleAdd = () => {
    resetAdminForm();
    resetAddUserForm();
    resetEditUserForm();
    setFakultasState(undefined);
    setModalState({ ...INITIAL_MODAL_STATE, isAddModalOpen: true });
  };

  //* ADD MAHASISWA */
  const onSubmitAddMahasiswa = (userPaylod: IMahasiswaManagementForm) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    mutateAddMahasiswa(userPaylod, {
      onSuccess: (data) => {
        void refetchUsers();
        customToast("success", data.message);
        setModalState(INITIAL_MODAL_STATE);
      },
      onError: (error) => {
        customToast("error", error?.message);
        setModalState((prev) => ({ ...prev, isAddLoading: false }));
      },
    });
  };

  //* UPDATE MAHASISWA */
  const onSubmitEditMahasiswa = (userPaylod: IEditMahasiswaManagementForm) => {
    setModalState((prev) => ({ ...prev, isEditLoading: true }));
    mutateEditMahasiswa(
      { ...userPaylod, isActive: checked },
      {
        onSuccess: (data) => {
          void refetchUsers();
          customToast("success", data.message);
          setModalState(INITIAL_MODAL_STATE);
        },
        onError: (error) => {
          customToast("error", error?.message);
          setModalState((prev) => ({ ...prev, isEditLoading: false }));
        },
      }
    );
  };

  //* ADD ADMIN */
  const onSubmitAddAdmin = (userPaylod: IAdminManagementForm) => {
    setModalState((prev) => ({ ...prev, isAddLoading: true }));
    mutateAddAdmin(userPaylod, {
      onSuccess: (data) => {
        void refetchUsers();
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

  //** EDIT FORM */
  const EDIT_MAHASISWA = [
    {
      className: "col-span-2",
      placeholder: "Nama Mahasiwa",
      label: "Nama Lengkap",
      register: { ...registerEdit("name") },
      error: errorsEditMahasiswaForm.name?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Nomor Induk Mahasiswa",
      label: "NBI",
      register: { ...registerEdit("npm") },
      error: errorsEditMahasiswaForm.npm?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Email",
      label: "Email",
      register: { ...registerEdit("email") },
      error: errorsEditMahasiswaForm.email?.message,
    },
    {
      disabled: true,
      className: "col-span-2",
      placeholder: "Fakultas",
      label: "Fakultas",
      type: "select",
      value: fakultasState?.id,
      control: editController,
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
      control: editController,
      register: { ...registerEdit("prodiId") },
      handleSelectOptionChange: handleFakultasChange,
      selectData: prodi,
      error: errorsEditMahasiswaForm.prodiId?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Semester",
      label: "Semester",
      register: { ...registerEdit("semester") },
      error: errorsEditMahasiswaForm.semester?.message,
    },
    {
      className: "col-span-2",
      placeholder: "Reset Password",
      label: "Reset Password",
      register: { ...register("password") },
      error: errorsEditMahasiswaForm.name?.message,
    },
    {
      className: "col-span-2",
      label: "Status Akun",
      type: "switch",
      customSwitchValue: true,
      value: checked ? "Aktif" : "Tidak Aktif",
      checked: checked,
      additionalInfo:
        "Untuk menonaktifkan pengguna, ubah status akun menjadi tidak aktif.",
      handlePrimitiveSwitch: () => setChecked(!checked),
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
    ADD_ADMIN,
    onSubmitAddMahasiswa,
    handleAddMahasiswa,
    handleAddAdmin,
    onSubmitAddAdmin,
    handleEdit,
    allUsers,
    EDIT_MAHASISWA,
    handleSubmitEdit,
    onSubmitEditMahasiswa,
  };
};

export { useUserManagement };
