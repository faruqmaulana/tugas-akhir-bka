import { api } from "~/utils/api";

const useDosen = () => {
  const { data: dosenData } = api.dosen.getAllDosen.useQuery();
  console.log(dosenData);
  return {};
};

export { useDosen };
