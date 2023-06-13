/*
  Warnings:

  - You are about to drop the column `close_hour` on the `attraction` table. All the data in the column will be lost.
  - You are about to drop the column `open_hour` on the `attraction` table. All the data in the column will be lost.
  - Added the required column `htm` to the `attraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attraction` DROP COLUMN `close_hour`,
    DROP COLUMN `open_hour`,
    ADD COLUMN `htm` INTEGER NOT NULL;
