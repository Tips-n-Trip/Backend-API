-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destination` (
    `id` VARCHAR(191) NOT NULL,
    `image_path` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `about` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `souvenir` (
    `id` VARCHAR(191) NOT NULL,
    `image_path` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `about` TEXT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `close_hour` CHAR(6) NOT NULL,
    `maps_link` VARCHAR(255) NOT NULL,
    `open_hour` CHAR(6) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attraction` (
    `id` VARCHAR(191) NOT NULL,
    `image_path` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `about` TEXT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `close_hour` CHAR(6) NOT NULL,
    `maps_link` VARCHAR(255) NOT NULL,
    `open_hour` CHAR(6) NOT NULL,
    `recomendation_time` VARCHAR(255) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itenerary` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `duration` VARCHAR(255) NOT NULL,
    `isSaved` BIT(1) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agenda` (
    `id` VARCHAR(191) NOT NULL,
    `day` INTEGER NOT NULL,
    `iteneraryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttractionsInAgendas` (
    `attractionId` VARCHAR(191) NOT NULL,
    `agendaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attractionId`, `agendaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `souvenir` ADD CONSTRAINT `souvenir_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attraction` ADD CONSTRAINT `attraction_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itenerary` ADD CONSTRAINT `itenerary_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itenerary` ADD CONSTRAINT `itenerary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_iteneraryId_fkey` FOREIGN KEY (`iteneraryId`) REFERENCES `itenerary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttractionsInAgendas` ADD CONSTRAINT `AttractionsInAgendas_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `agenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttractionsInAgendas` ADD CONSTRAINT `AttractionsInAgendas_attractionId_fkey` FOREIGN KEY (`attractionId`) REFERENCES `attraction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
