/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
import { type MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import StatusBadge from "~/common/components/ui/badge/StatusBagde";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import ModalForm from "~/common/components/ui/modal/ModalForm";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { STATUS } from "~/common/enums/STATUS";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";
import { useUserManagement } from "~/common/hooks/module/user-management/useUserManagement";
import { type allStudentTableType } from "~/server/api/module/user/user";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const UserManagement = () => {
  const {
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
  } = useUserManagement();

  const mahasiswaColumn = useMemo<MRT_ColumnDef<allStudentTableType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableClickToCopy: true,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableClickToCopy: true,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableClickToCopy: true,
      },
      {
        accessorKey: "npm",
        header: "NBI",
      },
      {
        header: "Fakultas",
        accessorKey: "fakultas",
      },
      {
        accessorKey: "prodi",
        header: "prodi",
      },
      {
        accessorKey: "semester",
        header: "Semester",
      },
      {
        accessorKey: "total_prestasi",
        header: "Total Prestasi",
      },
      {
        accessorKey: "isActive",
        header: "Status Akun",
        Cell: ({ cell }) => (
          <StatusBadge
            className="w-fit"
            status={Boolean(cell.getValue()) ? STATUS.APPROVE : STATUS.REJECT}
            text={Boolean(cell.getValue()) ? "Aktif" : "Tidak Aktif"}
          />
        ),
      },
    ],
    [tab]
  );

  const adminColumn = useMemo<MRT_ColumnDef<allStudentTableType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableClickToCopy: true,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableClickToCopy: true,
      },
      {
        accessorKey: "isActive",
        header: "Status Akun",
        Cell: ({ cell }) => (
          <StatusBadge
            className="w-fit"
            status={Boolean(cell.getValue()) ? STATUS.APPROVE : STATUS.REJECT}
            text={Boolean(cell.getValue()) ? "Aktif" : "Tidak Aktif"}
          />
        ),
      },
    ],
    [usersState, tab]
  );

  return (
    <>
      <PageHeading
        showCreateButton
        createButtonTitle={`data ${capitalizeFirstLetter(tab)}`}
        onOpen={handleAdd}
      />
      <Card header={`DATA ${tab}`} className="mt-[30px]">
        <div className="mb-3 mt-2 flex w-full !max-w-[360px] flex-row rounded-md border border-slate-300 bg-slate-200 p-1">
          <button
            type="button"
            className={`w-1/2 rounded-md py-[2px] ${
              tab === "MAHASISWA" ? "bg-white shadow-md" : "text-slate-500"
            }`}
            onClick={handleActiveMahasiswaTab}
          >
            Mahasiswa
          </button>
          <button
            type="button"
            className={`w-1/2 rounded-md py-[2px] ${
              tab === "ADMIN" ? "bg-white shadow-md" : "text-slate-500"
            }`}
            onClick={handleActiveAdminTab}
          >
            Admin
          </button>
        </div>
        <BaseTable
          columns={tab === "MAHASISWA" ? mahasiswaColumn : adminColumn}
          data={usersState}
        />
      </Card>
      <Modal
        isOpen={modalState.isAddModalOpen}
        content={
          <ModalForm
            formTitle={`Tambah Data ${capitalizeFirstLetter(tab)}`}
            onSubmit={
              tab === "MAHASISWA"
                ? handleAddMahasiswa(onSubmitAddMahasiswa)
                : handleAddAdmin(onSubmitAddAdmin)
            }
            FORMS={tab === "MAHASISWA" ? ADD_MAHASISWA : ADD_ADMIN}
            loadingSubmit={modalState.isAddLoading}
            onClose={handleClose}
          />
        }
        onCloseButton={handleClose}
      />
      {/* <Modal
        isOpen={modalState.isAddModalOpen}
        content={
          <ModalForm
            formTitle="Tambah Data Dosen"
            onSubmit={handleUpdateSubmit(onAddSubmit)}
            FORMS={DOSEN_FORM}
            loadingSubmit={modalState.isAddLoading}
            onClose={handleClose}
          />
        }
        onCloseButton={handleClose}
      />
      <Modal
        isOpen={modalState.isEditModalOpen}
        content={
          <ModalForm
            formTitle="ubah data dosen"
            onSubmit={handleUpdateSubmit(onUpdateSubmit)}
            FORMS={DOSEN_FORM}
            loadingSubmit={modalState.isEditLoading}
            onClose={handleClose}
          />
        }
        onCloseButton={handleClose}
      /> */}
    </>
  );
};

export default UserManagement;
