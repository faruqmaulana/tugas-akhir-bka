import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import { type userQuery } from "~/server/queries/module/user/user.query";
import getAllPatenAndHakiHandler from "./getAllPKM.handler";
import addBookHandler from "./createBook.handler";
import rejectBookHandler from "./rejectBook.handler";
import approveBookHandler from "./approveBook.handler";
import editBookHandler from "./editBook.handler";
import getBookByIdHandler from "./getBookById.handler";

export type BookByIdType = Prisma.BukuGetPayload<{
  include: {
    ActivityLog: {
      include: {
        User: { select: typeof userQuery },
      },
    },
  },
}>;

export const bookModule = createTRPCRouter({
  addBook: addBookHandler,
  rejectBook: rejectBookHandler,
  approveBook: approveBookHandler,
  editBook: editBookHandler,
  getBookById: getBookByIdHandler,
  getAllPatenAndHaki: getAllPatenAndHakiHandler,
});
