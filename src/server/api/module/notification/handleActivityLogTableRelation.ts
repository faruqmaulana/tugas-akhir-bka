import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";

const handleActivityLogTableRelation = ({
  MODULE_CODE,
  moduleId,
}: {
  MODULE_CODE: string;
  moduleId: string;
}) => {
  if (MODULE_CODE === MODULE_TYPE_CODE.KEJUARAAN) {
    return { prestasiDataTableId: moduleId };
  }

  if (MODULE_CODE === MODULE_TYPE_CODE.BEASISWA) {
    return { pengajuanBeasiswaId: moduleId };
  }

  if (MODULE_CODE === MODULE_TYPE_CODE.PKM) {
    return { pengajuanPKMId: moduleId };
  }

  if (MODULE_CODE === MODULE_TYPE_CODE.BUKU) {
    return { bukuId: moduleId };
  }

  if (
    MODULE_CODE === MODULE_TYPE_CODE.HAKI ||
    MODULE_CODE === MODULE_TYPE_CODE.PATEN
  ) {
    return { patenAndHakiTableId: moduleId };
  }

  return;
};

export default handleActivityLogTableRelation;
