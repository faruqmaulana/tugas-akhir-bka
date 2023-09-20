import { api } from "~/utils/api";

const useUserManagement = () => {
  const { data: allStudents } = api.user.getAllMahasiswa.useQuery();

  return { allStudents };
};

export { useUserManagement };
