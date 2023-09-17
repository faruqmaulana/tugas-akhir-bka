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

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userData,
  lecturer: lecturerQuery,

  // ** MASTER DATA QUERY
  prodi: prodiQuery,
  orkem: orkemQuery,
  kejuaraan: tingkatKejuaraanQuery,
  prestasi: tingkatPrestasiQuery,

  // ** PENGAJUAN DATA
  prestasiLomba: championshipQueryHandler,

  // ** NOTIFICATION
  notification: notificationQuery,

  // ** ACTIVITY LOG
  activityLog: activityLogQuery,
});

// export type definition of API
export type AppRouter = typeof appRouter;
