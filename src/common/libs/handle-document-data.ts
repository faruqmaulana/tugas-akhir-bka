import { type Prisma } from "@prisma/client";
import { JSONtoString, stringToJSON } from "../helpers/parseJSON";

export type DocumentTypeString = {
  dokumenPendukung: string;
  fotoPenyerahanPiala: string;
  piagamPenghargaan: string;
  undanganKejuaraan: string;
};

export type DocumentTypeJSONObject = {
  dokumenPendukung: Prisma.JsonObject | null;
  fotoPenyerahanPiala: Prisma.JsonObject | null;
  piagamPenghargaan: Prisma.JsonObject | null;
  undanganKejuaraan: Prisma.JsonObject | null;
};

export const handleDocumentMetaToJSON = (props: DocumentTypeString) => {
  const {
    dokumenPendukung,
    fotoPenyerahanPiala,
    piagamPenghargaan,
    undanganKejuaraan,
  } = props;
  const parseDokumenPendukung = stringToJSON(dokumenPendukung) || undefined;
  const parsePiagamPenghargaan = stringToJSON(piagamPenghargaan) || undefined;
  const parseUndanganKejuaraan = stringToJSON(undanganKejuaraan) || undefined;
  const parseFotoPenyerahanPiala = stringToJSON(fotoPenyerahanPiala) || undefined;

  return {
    dokumenPendukung: parseDokumenPendukung,
    fotoPenyerahanPiala: parseFotoPenyerahanPiala,
    piagamPenghargaan: parsePiagamPenghargaan,
    undanganKejuaraan: parseUndanganKejuaraan,
  };
};

export const handleDocumentMetaToString = (props: DocumentTypeJSONObject) => {
  const {
    dokumenPendukung,
    fotoPenyerahanPiala,
    piagamPenghargaan,
    undanganKejuaraan,
  } = props;

  const parseDokumenPendukung = JSONtoString(dokumenPendukung);
  const parseFotoPenyerahanPiala = JSONtoString(fotoPenyerahanPiala);
  const parsePiagamPenghargaan = JSONtoString(piagamPenghargaan);
  const parseUndanganKejuaraan = JSONtoString(undanganKejuaraan);

  return {
    dokumenPendukung: parseDokumenPendukung,
    fotoPenyerahanPiala: parseFotoPenyerahanPiala,
    piagamPenghargaan: parsePiagamPenghargaan,
    undanganKejuaraan: parseUndanganKejuaraan,
  };
};
