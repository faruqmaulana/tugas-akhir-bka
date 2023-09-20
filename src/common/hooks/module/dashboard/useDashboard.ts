import { api } from "~/utils/api";

const useDashboard = () => {
  const { data } = api.statistic.achievementByFaculty.useQuery();
  return { data };
};

export { useDashboard };
