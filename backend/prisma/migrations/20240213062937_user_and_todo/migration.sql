/*
  Warnings:

  - Made the column `desc` on table `Todo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "desc" SET NOT NULL,
ALTER COLUMN "desc" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "lastname" SET DEFAULT '';
