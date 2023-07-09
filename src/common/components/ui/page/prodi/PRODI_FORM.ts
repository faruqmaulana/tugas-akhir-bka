export const ADD_PRODI_FORM = [
  {
    className: "col-span-2",
    placeholder: "Nama Prodi",
    label: "Prodi",
  },
  {
    className: "col-span-2",
    placeholder: "Pilih Fakultas",
    label: "Fakultas",
    type: "select",
    value: "Teknik",
    selectData: [
      {
        id: "teknik",
        title: "Teknik",
      },
      {
        id: "kedokteran",
        title: "Kedokteran",
      },
    ],
  },
];
