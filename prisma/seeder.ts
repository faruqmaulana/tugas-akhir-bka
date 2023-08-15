/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, Role } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

async function seedFakultas() {
  await prisma.masterDataFakultas.createMany({
    data: [
      { name: "Fakultas A" },
      { name: "Fakultas B" },
      // Add more fakultas data as needed
    ],
  });
}

async function seedProdi() {
  const fakultas = await prisma.masterDataFakultas.findMany(); // Retrieve all users
  console.log("fakultas", fakultas);
  await prisma.masterDataProdi.createMany({
    data: [
      { name: "Prodi A", fakultasId: fakultas[0]?.id },
      { name: "Prodi B", fakultasId: fakultas[0]?.id },
      { name: "Prodi C", fakultasId: fakultas[1]?.id },
      // Add more prodi data as needed
    ],
  });
}

async function seedUsers() {
  const prodi = await prisma.masterDataProdi.findMany(); // Retrieve all users

  await prisma.user.createMany({
    data: [
      {
        name: "faruqlulus",
        npm: "faruqlulus",
        alamat: "Alamat 2",
        semester: "Semester 2",
        phone: "Phone 2",
        email: "user3@example.com",
        password: await hash("faruqlulus"),
        role: Role.ADMIN,
        prodiId: prodi[1]!.id,
      },
      {
        name: "dimasspeed",
        npm: "dimasspeed",
        alamat: "Alamat 2",
        semester: "Semester 2",
        phone: "Phone 2",
        email: "user4@example.com",
        password: await hash("dimasspeed"),
        role: Role.MAHASISWA,
        prodiId: prodi[1]!.id,
      },
      // Add more user data as needed
    ],
  });
}

async function seedTingkatKejuaraan() {
  await prisma.masterDataTingkatKejuaraan.createMany({
    data: [
      { name: "Tingkat Kejuaraan A" },
      { name: "Tingkat Kejuaraan B" },
      // Add more tingkat kejuaraan data as needed
    ],
  });
}

async function seedTingkatPrestasi() {
  await prisma.masterDataFakultas.createMany({
    data: [
      { name: "Tingkat Prestasi A" },
      { name: "Tingkat Prestasi B" },
      // Add more tingkat prestasi data as needed
    ],
  });
}

async function seedStatus() {
  await prisma.masterDataStatus.createMany({
    data: [
      { name: "Status A", backgroundColor: "#000000" },
      { name: "Status B", backgroundColor: "#FFFFFF" },
      // Add more status data as needed
    ],
  });
}

async function seedDosen() {
  await prisma.dosen.createMany({
    data: [
      { name: "Dosen 1", nidn: "nidn-1" },
      { name: "Dosen 2", nidn: "nidn-2" },
      // Add more dosen data as needed
    ],
  });
}

// async function seedPrestasiDataTable() {
//   const users = await prisma.user.findMany(); // Retrieve all users
//   const dosen = await prisma.dosen.findMany(); // Retrieve all users
//   const tingkatKejuaraan = await prisma.masterDataTingkatKejuaraan.findMany(); // Retrieve all users
//   const tingkatPrestasi = await prisma.masterDataTingkatPrestasi.findMany(); // Retrieve all users
//   const status = await prisma.masterDataStatus.findMany(); // Retrieve all users

//   await prisma.prestasiDataTable.create({
//     data: {
//       nama: "Prestasi 1",
//       noSK: "no-sk-1",
//       tanggalSK: new Date(),
//       orkem: "Orkem 1",
//       kegiatan: "Kegiatan 1",
//       tanggalKegiatan: new Date(),
//       penyelenggara: "Penyelenggara 1",
//       keterangan: "Keterangan 1",
//       isValidated: false,
//       validatedAt: new Date(),
//       tingkatKejuaraanId: tingkatKejuaraan[0]!.id,
//       tingkatPrestasiId: tingkatPrestasi[0]!.id,
//       statusId: status[0]!.id,
//       dosenId: dosen[0]!.id,
//       users: { connect: [{ id: users[0]?.id }, { id: users[1]?.id }] },
//       // Connect the first user
//     },
//   });
// }

async function seed() {
  const seedingFunctions = [
    seedFakultas,
    seedProdi,
    seedUsers,
    // seedTingkatKejuaraan,
    // seedTingkatPrestasi,
    // seedStatus,
    // seedDosen,
    // seedPrestasiDataTable,
  ];

  try {
    for (const seedingFunction of seedingFunctions) {
      await seedingFunction();
    }

    console.log("Seeder completed successfully.");
  } catch (error) {
    console.error("Seeder encountered an error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
