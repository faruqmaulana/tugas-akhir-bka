import { createTRPCRouter } from "../../trpc";
import getAchievementByFacultyHandler from "./getAchievementByFaculty.handler";

export const statisticQuery = createTRPCRouter({
  achievementByFaculty: getAchievementByFacultyHandler,
});
