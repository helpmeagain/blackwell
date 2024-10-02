/*
  Warnings:

  - The `allergies` column on the `universal_medical_records` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "universal_medical_records" DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[];
