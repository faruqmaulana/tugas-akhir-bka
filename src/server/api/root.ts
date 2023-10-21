import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { userData } from "./module/user/user";
import { prodiQuery } from "./module/master-data/prodi";
import { orkemQuery } from "./module/master-data/orkem";
import { tingkatKejuaraanQuery } from "./module/master-data/tingkatKejuaraan";
import { tingkatPrestasiQuery } from "./module/master-data/tingkatPrestasi";
import { championshipQueryHandler } from "./module/pengajuan/_router";
import { notificationQuery } from "./module/notification/notification";
import { activityLogQuery } from "./module/activity-log/activityLog";
import { lecturerQuery } from "./module/master-data/lecturer/_router";
import { facultyQuery } from "./module/master-data/faculty/_router";
import { studyProgramQuery } from "./module/master-data/study-program/_router";
import { studentOrganizationQuery } from "./module/master-data/student-organization/_router";
import { championshipLevelQuery } from "./module/master-data/championship-level/_router";
import { achievementLevelQuery } from "./module/master-data/achievement-level/_router";
import { statisticQuery } from "./module/statistic/_router";
import { registerQuery } from "./module/register/_router";
import { scholarshipQuery } from "./module/master-data/scholarship/_router";
import { scholarshipModule } from "./module/pengajuan/beasiswa/_router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userData,

  // ** MASTER DATA QUERY
  lecturer: lecturerQuery,
  faculty: facultyQuery,
  studyProgram: studyProgramQuery,
  studentOrganization: studentOrganizationQuery,
  championshipLevel: championshipLevelQuery,
  achievementLevel: achievementLevelQuery,
  scholarship: scholarshipQuery,


  // ** STATISTIC
  statistic: statisticQuery,

  prodi: prodiQuery,
  orkem: orkemQuery,
  kejuaraan: tingkatKejuaraanQuery,
  prestasi: tingkatPrestasiQuery,

  // ** PENGAJUAN DATA
  prestasiLomba: championshipQueryHandler,
  scholarshipModule: scholarshipModule,


  // ** NOTIFICATION
  notification: notificationQuery,

  // ** ACTIVITY LOG
  activityLog: activityLogQuery,

  // ** REGISTER
  register: registerQuery,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;
