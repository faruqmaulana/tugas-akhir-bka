import { type BarResultType } from "~/server/api/module/statistic/getAchievementByFaculty.handler";
import { api } from "~/utils/api";

const useDashboard = () => {
  const { data } = api.statistic.achievementByFaculty.useQuery<BarResultType>();
  return { data };
};

export { useDashboard };
