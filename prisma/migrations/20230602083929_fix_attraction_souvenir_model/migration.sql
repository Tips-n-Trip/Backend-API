/*
  Warnings:

  - You are about to drop the column `address` on the `attraction` table. All the data in the column will be lost.
  - You are about to drop the column `maps_link` on the `attraction` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `souvenir` table. All the data in the column will be lost.
  - You are about to drop the column `close_hour` on the `souvenir` table. All the data in the column will be lost.
  - You are about to drop the column `maps_link` on the `souvenir` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `attraction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `attraction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `souvenir` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `souvenir` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attraction` DROP COLUMN `address`,
    DROP COLUMN `maps_link`,
    ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `souvenir` DROP COLUMN `address`,
    DROP COLUMN `close_hour`,
    DROP COLUMN `maps_link`,
    ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL;
