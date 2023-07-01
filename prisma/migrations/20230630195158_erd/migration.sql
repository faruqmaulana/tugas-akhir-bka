-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `npm` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NULL,
    `semester` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('MAHASISWA', 'ADMIN') NOT NULL DEFAULT 'MAHASISWA',
    `prodiId` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dosen` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nidn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fakultas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prodi` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fakultasId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TingkatKejuaraan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TingkatPrestasi` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `backgroundColor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LampiranData` (
    `id` VARCHAR(191) NOT NULL,
    `piagamPenghargaan` VARCHAR(191) NULL,
    `fotoPenyerahanPiala` VARCHAR(191) NULL,
    `undanganKejuaraan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrestasiDataTable` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `noSK` VARCHAR(191) NULL,
    `tanggalSK` DATETIME(3) NULL,
    `orkem` VARCHAR(191) NULL,
    `kegiatan` VARCHAR(191) NULL,
    `tanggalKegiatan` DATETIME(3) NOT NULL,
    `penyelenggara` VARCHAR(191) NULL,
    `isValidated` BOOLEAN NOT NULL DEFAULT false,
    `validatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tingkatKejuaraanId` VARCHAR(191) NOT NULL,
    `tingkatPrestasiId` VARCHAR(191) NOT NULL,
    `statusId` VARCHAR(191) NOT NULL,
    `dosenId` VARCHAR(191) NOT NULL,
    `lampiranId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengajuanOnUser` (
    `userId` VARCHAR(191) NOT NULL,
    `prestasiDataTableId` VARCHAR(191) NOT NULL,
    `PengajuanPKMId` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL DEFAULT 'Ketua Tim',

    PRIMARY KEY (`userId`, `prestasiDataTableId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengajuanPKM` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tanggalKegiatan` DATETIME(3) NOT NULL,
    `isValidated` BOOLEAN NOT NULL DEFAULT false,
    `validatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lampiran` VARCHAR(191) NULL,
    `totalAnggaran` INTEGER NOT NULL,
    `anggaranDosen` INTEGER NOT NULL,
    `statusId` VARCHAR(191) NOT NULL,
    `dosenId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengajuanBeasiswa` (
    `id` VARCHAR(191) NOT NULL,
    `isValidated` BOOLEAN NOT NULL DEFAULT false,
    `validatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lampiran` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SKRektor` (
    `id` VARCHAR(191) NOT NULL,
    `nomorSK` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `lampiran` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Haki` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `nomorPaten` VARCHAR(191) NOT NULL,
    `expiredDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `keterangan` VARCHAR(191) NOT NULL,
    `validatedAt` DATETIME(3) NOT NULL,
    `isValidated` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paten` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `nomorPaten` VARCHAR(191) NOT NULL,
    `expiredDate` DATETIME(3) NOT NULL,
    `validatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `keterangan` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buku` (
    `id` VARCHAR(191) NOT NULL,
    `NomorISBN` VARCHAR(191) NOT NULL,
    `Penulis` VARCHAR(191) NOT NULL,
    `Pengarang` VARCHAR(191) NOT NULL,
    `Penerbit` VARCHAR(191) NOT NULL,
    `tahunTerbit` DATETIME(3) NOT NULL,
    `jumlahEksemplar` INTEGER NOT NULL,
    `validatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `statusId` VARCHAR(191) NOT NULL,
    `prestasiDataTableId` VARCHAR(191) NULL,
    `hakiId` VARCHAR(191) NULL,
    `patenId` VARCHAR(191) NULL,
    `bukuId` VARCHAR(191) NULL,
    `pengajuanPKMId` VARCHAR(191) NULL,
    `pengajuanBeasiswaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `readed` BOOLEAN NOT NULL DEFAULT false,
    `prestasiDataTableId` VARCHAR(191) NULL,
    `hakiId` VARCHAR(191) NULL,
    `patenId` VARCHAR(191) NULL,
    `bukuId` VARCHAR(191) NULL,
    `pengajuanPKMId` VARCHAR(191) NULL,
    `pengajuanBeasiswaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_prodiId_fkey` FOREIGN KEY (`prodiId`) REFERENCES `Prodi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prodi` ADD CONSTRAINT `Prodi_fakultasId_fkey` FOREIGN KEY (`fakultasId`) REFERENCES `Fakultas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestasiDataTable` ADD CONSTRAINT `PrestasiDataTable_tingkatKejuaraanId_fkey` FOREIGN KEY (`tingkatKejuaraanId`) REFERENCES `TingkatKejuaraan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestasiDataTable` ADD CONSTRAINT `PrestasiDataTable_tingkatPrestasiId_fkey` FOREIGN KEY (`tingkatPrestasiId`) REFERENCES `TingkatPrestasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestasiDataTable` ADD CONSTRAINT `PrestasiDataTable_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestasiDataTable` ADD CONSTRAINT `PrestasiDataTable_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestasiDataTable` ADD CONSTRAINT `PrestasiDataTable_lampiranId_fkey` FOREIGN KEY (`lampiranId`) REFERENCES `LampiranData`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanOnUser` ADD CONSTRAINT `PengajuanOnUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanOnUser` ADD CONSTRAINT `PengajuanOnUser_prestasiDataTableId_fkey` FOREIGN KEY (`prestasiDataTableId`) REFERENCES `PrestasiDataTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanOnUser` ADD CONSTRAINT `PengajuanOnUser_PengajuanPKMId_fkey` FOREIGN KEY (`PengajuanPKMId`) REFERENCES `PengajuanPKM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanPKM` ADD CONSTRAINT `PengajuanPKM_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanPKM` ADD CONSTRAINT `PengajuanPKM_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengajuanBeasiswa` ADD CONSTRAINT `PengajuanBeasiswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Haki` ADD CONSTRAINT `Haki_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paten` ADD CONSTRAINT `Paten_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Buku` ADD CONSTRAINT `Buku_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_prestasiDataTableId_fkey` FOREIGN KEY (`prestasiDataTableId`) REFERENCES `PrestasiDataTable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_hakiId_fkey` FOREIGN KEY (`hakiId`) REFERENCES `Haki`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_patenId_fkey` FOREIGN KEY (`patenId`) REFERENCES `Paten`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_bukuId_fkey` FOREIGN KEY (`bukuId`) REFERENCES `Buku`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_pengajuanPKMId_fkey` FOREIGN KEY (`pengajuanPKMId`) REFERENCES `PengajuanPKM`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_pengajuanBeasiswaId_fkey` FOREIGN KEY (`pengajuanBeasiswaId`) REFERENCES `PengajuanBeasiswa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_prestasiDataTableId_fkey` FOREIGN KEY (`prestasiDataTableId`) REFERENCES `PrestasiDataTable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_hakiId_fkey` FOREIGN KEY (`hakiId`) REFERENCES `Haki`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_patenId_fkey` FOREIGN KEY (`patenId`) REFERENCES `Paten`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_bukuId_fkey` FOREIGN KEY (`bukuId`) REFERENCES `Buku`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_pengajuanPKMId_fkey` FOREIGN KEY (`pengajuanPKMId`) REFERENCES `PengajuanPKM`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_pengajuanBeasiswaId_fkey` FOREIGN KEY (`pengajuanBeasiswaId`) REFERENCES `PengajuanBeasiswa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
