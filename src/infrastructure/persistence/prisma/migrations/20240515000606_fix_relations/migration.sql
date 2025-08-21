/*
  Warnings:

  - The `consultations_ids` column on the `medical_records` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `medical_record_id` to the `consultations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "medical_records" DROP CONSTRAINT "medical_records_consultations_ids_fkey";

-- AlterTable
ALTER TABLE "consultations" ADD COLUMN     "medical_record_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "medical_records" DROP COLUMN "consultations_ids",
ADD COLUMN     "consultations_ids" TEXT[];

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_medical_record_id_fkey" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
