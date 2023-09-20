import { userQuery } from "~/server/queries/module/user/user.query";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { hash, verify } from "argon2";
import { PASSWORD_NOT_MATCH, UPDATE_PROFILE_SUCCESS } from "~/common/message";
import { TRPCError } from "@trpc/server";
import { removeEmptyStringProperties } from "~/common/helpers/removeEmptyStringProperties";
import { loginInformation, userProfileForm } from "~/common/schemas/user";
import { type Prisma, Role } from "@prisma/client";
import { STATUS } from "~/common/enums/STATUS";

export type allStudentsType = Prisma.UserGetPayload<{
  select: typeof userQuery & {
    _count: {
      select: {
        prestasiDataTables: {
          where: {
            PrestasiDataTable: {
              status: {
                equals: STATUS.APPROVE;
              };
            };
          };
        };
      };
    };
  };
}>[];

export type allStudentTableType = {
  name: string;
  email: string;
  phone: string;
  npm: string;
  fakultas: string;
  prodi: string;
  semester: string;
  total_prestasi: number;
};

export const userData = createTRPCRouter({
  //** GET ALL MAHASISWA
  getAllMahasiswaSelect: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findMany({
        where: { role: Role.MAHASISWA },
        select: { id: true, name: true },
      });
    } catch (error) {
      return error;
    }
  }),

  getAllMahasiswa: protectedProcedure.query(async ({ ctx }) => {
    try {
      const reqAllStudents = (await ctx.prisma.user.findMany({
        where: { role: Role.MAHASISWA },
        select: {
          ...userQuery,
          _count: {
            select: {
              prestasiDataTables: {
                where: {
                  PrestasiDataTable: {
                    status: {
                      equals: STATUS.APPROVE,
                    },
                  },
                },
              },
            },
          },
        },
      })) as allStudentsType;

      const allTransformedStudents = reqAllStudents.map((val) => {
        return {
          name: val.name,
          email: val.email,
          phone: val.phone,
          npm: val.npm,
          fakultas: val.prodi?.Fakultas.name,
          prodi: val.prodi?.name,
          semester: val.semester,
          total_prestasi: val._count.prestasiDataTables,
        };
      }) as allStudentTableType[];

      return allTransformedStudents;
    } catch (error) {
      return error;
    }
  }),

  //** GET USER PROFILE */
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findUnique({
        where: { id: ctx.session?.user.userId },
        select: userQuery,
      });
    } catch (error) {
      return error;
    }
  }),

  //** UPDATE USER PROFILE */
  updateUserProfile: protectedProcedure
    .input(userProfileForm)
    .mutation(async ({ ctx, input }) => {
      try {
        // DO UPDATE
        const data = await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.userId,
          },
          data: removeEmptyStringProperties(input),
          select: userQuery,
        });

        return {
          message: UPDATE_PROFILE_SUCCESS,
          data,
        };
      } catch (error) {
        throw error;
      }
    }),

  //** UPDATE INFORMATION LOGIN */
  updateUserPassword: protectedProcedure
    .input(loginInformation)
    .mutation(async ({ ctx, input }) => {
      try {
        const { password, passwordConfirmation } = input;
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session?.user.userId },
          select: { ...userQuery, password: true },
        });

        // CHECK IS VALID PASSWORD
        const isValidPassword = await verify(user!.password, password);

        if (!isValidPassword && password !== "") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: PASSWORD_NOT_MATCH,
          });
        }

        // DO UPDATE PASSWORD
        const data = await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.userId,
          },
          data: { password: await hash(passwordConfirmation) },
          select: userQuery,
        });

        return {
          message: UPDATE_PROFILE_SUCCESS,
          data,
        };
      } catch (error) {
        throw error;
      }
    }),
});
