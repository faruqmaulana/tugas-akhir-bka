// ALL MODULE
export const MOUDLE_KEJUARAAN = "Prestasi Lomba dan Kejuaraan";
export const MOUDLE_PKM = "PKM";
export const MOUDLE_BEASISWA = "Beasiswa";
export const MOUDLE_HAKI = "HAKI";
export const MOUDLE_PATEN = "Paten";
export const MOUDLE_BUKU = "Buku";
export const MODULE_NOTIFIKASI = "Notifikasi";

export const ALL_DATA = "Semua Data";
export const CREATE_SUCCESS = "Berhasil Ditambahkan!";
export const UPDATE_SUCCESS = "Berhasil Diupdate!";
export const DELETE_SUCCESS = "Berhasil Dihapus!";

export const DATA_SUCCESSFULLY_DELETED = `Data ${DELETE_SUCCESS}`;

// GENERAL MODULE MESSAGE
export const PENGAJUAN_MESSAGE_BY_ADMIN_SIDE = (
  username: string,
  module: string
) => {
  return `<b>${username}</b> menambahkan pengajuan <b>${module}</b>, mohon segera segera divalidasi.`;
};

export const PENGAJUAN_MESSAGE_BY_USER_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> anda berhasil dikirim.`;
};

export const PENGAJUAN_ACCEPTED_BY_USER_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> anda disetujui oleh admin.`;
};

export const PENGAJUAN_ACCEPTED_BY_ADMIN_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> berhasil disetujui.`;
};

export const PENGAJUAN_REJECTED_BY_USER_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> anda ditolak oleh admin.`;
};

export const PENGAJUAN_REJECTED_BY_ADMIN_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> berhasil ditolak.`;
};

export const PENGAJUAN_EDITED_BY_USER_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> berhasil diperbarui.`;
};

export const PENGAJUAN_EDITED_BY_ADMIN_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> telah diperbarui.`;
};

export const PENGAJUAN_REPROCESS_BY_USER_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> berhasil diajukan ulang.`;
};

export const PENGAJUAN_REPROCESS_BY_ADMIN_SIDE = (module: string) => {
  return `Pengajuan <b>${module}</b> telah diajukan ulang.`;
};

export const DELETE_ALL_MODULE = (module: string) => {
  return `${ALL_DATA} ${module} ${DELETE_SUCCESS}`;
};

export const UPDATE_ALL_MODULE = (module: string) => {
  return `${ALL_DATA} ${module} ${UPDATE_SUCCESS}`;
};

// module login
export const LOGIN_SUCCES = "Berhasil Login!";
export const LOGIN_ERROR = "Gagal Login!";
export const LOGIN_TOAST = {
  success: LOGIN_SUCCES,
  error: LOGIN_ERROR,
};
