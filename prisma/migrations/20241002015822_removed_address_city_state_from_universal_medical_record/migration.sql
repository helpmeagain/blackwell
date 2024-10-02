/*
  Warnings:

  - You are about to drop the column `address` on the `universal_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `universal_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `universal_medical_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "universal_medical_records" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "state";
