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
      { name: "Fakultas Teknik" },
      { name: "Fakultas Bahasa" },
      // Add more fakultas data as needed
    ],
  });
}

async function seedProdi() {
  const fakultas = await prisma.masterDataFakultas.findMany(); // Retrieve all users
  await prisma.masterDataProdi.createMany({
    data: [
      { name: "Teknik Informatika", fakultasId: fakultas[0]?.id },
      { name: "Teknik Mesin", fakultasId: fakultas[0]?.id },
      { name: "Sastra Inggris", fakultasId: fakultas[1]?.id },
      // Add more prodi data as needed
    ],
  });
}

async function seedUsers() {
  const prodi = await prisma.masterDataProdi.findMany(); // Retrieve all users

  await prisma.user.createMany({
    data: [
      {
        name: "Mas Taufik",
        npm: "taufik123",
        alamat: "Alamat 2",
        semester: "Semester 2",
        phone: "Phone 2",
        email: "taufik123@example.com",
        password: await hash("taufik123"),
        role: Role.ADMIN,
      },
      {
        name: "faruqlulus",
        npm: "faruqlulus",
        alamat: "Alamat 2",
        semester: "Semester 2",
        phone: "Phone 2",
        email: "user3@example.com",
        password: await hash("faruqlulus"),
        role: Role.MAHASISWA,
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
      {
        name: "angga",
        npm: "angga",
        alamat: "Alamat 3",
        semester: "Semester 2",
        phone: "08357857848",
        email: "angga@example.com",
        password: await hash("angga123"),
        role: Role.MAHASISWA,
        prodiId: prodi[1]!.id,
      },
      {
        name: "John Doe",
        npm: "johndoee",
        alamat: "Alamat 4",
        semester: "Semester 2",
        phone: "08357857848",
        email: "johndoe@example.com",
        password: await hash("johndoee"),
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
      { name: "Nasional" },
      { name: "Regional" },
      { name: "Internasional" },
      // Add more tingkat kejuaraan data as needed
    ],
  });
}

async function seedTingkatPrestasi() {
  await prisma.masterDataTingkatPrestasi.createMany({
    data: [
      { name: "Juara 1" },
      { name: "Juara 2" },
      { name: "Juara 3" },
      // Add more tingkat prestasi data as needed
    ],
  });
}

async function seedDosen() {
  const prodi = await prisma.masterDataProdi.findMany();
  await prisma.dosen.createMany({
    data: [
      {
        name: "Fridy Mandita, S.Kom., M.Sc",
        nidn: "nidn-1",
        prodiId: prodi[0]!.id,
      },
      {
        name: "Muhamad Firdaus S.Kom.,M.Kom",
        nidn: "nidn-2",
        prodiId: prodi[1]!.id,
      },
      // Add more dosen data as needed
    ],
  });
}
async function seedOrkem() {
  await prisma.masterDataOrkem.createMany({
    data: [
      {
        name: "Karate",
      },
      {
        name: "Silat",
      },
      {
        name: "Robotika",
      },
      {
        name: "Kesenian",
      },
      // Add more dosen data as needed
    ],
  });
}

async function seed() {
  const seedingFunctions = [
    seedFakultas,
    seedProdi,
    seedUsers,
    seedTingkatKejuaraan,
    seedTingkatPrestasi,
    seedDosen,
    seedOrkem,
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
