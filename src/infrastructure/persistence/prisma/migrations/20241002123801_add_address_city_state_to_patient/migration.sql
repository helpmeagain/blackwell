/*
  Warnings:

  - Added the required column `address` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
