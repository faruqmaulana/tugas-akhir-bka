// export type QueueCategoriesTypes ={
//   que
// }

import { type QueueCategories } from "@prisma/client";

export type QueueDataType = {
  id?: string;
  queue_categories?: QueueCategories;
  queue_number?: number;
  queue_code?: string;
  next_day?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
  userId?: string;

  user?: { id: string; name: string | null; nik: string; phone: string };

  // aditional types
  statusMessages?: string;

  [key: string]: any; // add index signature
};
