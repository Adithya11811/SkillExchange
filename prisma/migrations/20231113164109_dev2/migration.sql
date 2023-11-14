/*
  Warnings:

  - Added the required column `RealName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `profilePhoto` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `RealName` VARCHAR(191) NOT NULL,
    MODIFY `profilePhoto` TEXT NOT NULL,
    MODIFY `birthdate` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `skill` MODIFY `Proficiency` VARCHAR(191) NOT NULL;
