/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { stringToJSON } from "~/common/helpers/parseJSON";
import { UPDATE_SUCCESS } from "~/common/message";
import { scholarshipSchema } from "~/common/schemas/module/master-data/scholarship.schema";
import { protectedProcedure } from "~/server/api/trpc";

const editScholarshipMasterDataHandler = protectedProcedure
  .input(scholarshipSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, syarat, templateFormulir } = input;
    const templateFormulirJsonMeta =
      stringToJSON(templateFormulir as string) || undefined;

    const data = await ctx.prisma.masterDataBeasiswa.update({
      where: { id },
      data: { syarat, templateFormulir: templateFormulirJsonMeta },
    });

    return { message: `Data ${UPDATE_SUCCESS}`, data };
  });

export default editScholarshipMasterDataHandler;
