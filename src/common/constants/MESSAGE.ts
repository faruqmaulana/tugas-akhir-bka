// ALL MODULE
export const MOUDLE_KEJUARAAN = "Prestasi Lomba dan Kejuaraan";
export const MOUDLE_PKM = "PKM";
export const MOUDLE_BEASISWA = "Beasiswa";
export const MOUDLE_HAKI = "HAKI";
export const MOUDLE_PATEN = "Paten";
export const MOUDLE_BUKU = "Buku";

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

export const CREATE_SUCCESS = "Data Berhasil Ditambahkan!";
export const UPDATE_SUCCESS = "Data Berhasil Diupdate!";
export const DELETE_SUCCESS = "Data Berhasil Dihapus!";

// module login
export const LOGIN_SUCCES = "Berhasil Login!";
export const LOGIN_ERROR = "Gagal Login!";
export const LOGIN_TOAST = {
  success: LOGIN_SUCCES,
  error: LOGIN_ERROR,
};
