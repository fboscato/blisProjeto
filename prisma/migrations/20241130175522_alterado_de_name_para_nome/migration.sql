/*
  Warnings:

  - You are about to drop the column `name` on the `abilities` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user_documents` table. All the data in the column will be lost.
  - Added the required column `nome` to the `abilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `user_documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `abilities` DROP COLUMN `name`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_documents` DROP COLUMN `name`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;
