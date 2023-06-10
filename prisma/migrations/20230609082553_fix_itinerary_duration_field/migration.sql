/*
  Warnings:

  - You are about to alter the column `duration` on the `itenerary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `itenerary` MODIFY `duration` INTEGER NOT NULL;
