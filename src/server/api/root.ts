import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { userData } from "./module/user/user";
import { prodiQuery } from "./module/master-data/prodi";
import { dosenQuery } from "./module/master-data/dosen";
import { orkemQuery } from "./module/master-data/orkem";
import { tingkatKejuaraanQuery } from "./module/master-data/tingkatKejuaraan";
import { tingkatPrestasiQuery } from "./module/master-data/tingkatPrestasi";
import { prestasiLombaQuery } from "./module/pengajuan/prestasi";
import { notificationQuery } from "./module/notification/notification";
import { activityLogQuery } from "./module/activity-log/activityLog";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userData,
  dosen: dosenQuery,

  // ** MASTER DATA QUERY
  prodi: prodiQuery,
  orkem: orkemQuery,
  kejuaraan: tingkatKejuaraanQuery,
  prestasi: tingkatPrestasiQuery,

  // ** PENGAJUAN DATA
  prestasiLomba: prestasiLombaQuery,

  // ** NOTIFICATION
  notification: notificationQuery,

  // ** ACTIVITY LOG
  activityLog: activityLogQuery,
});

// export type definition of API
export type AppRouter = typeof appRouter;
