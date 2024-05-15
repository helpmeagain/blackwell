/*
  Warnings:

  - You are about to drop the column `medical_record_id` on the `consultations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "consultations" DROP CONSTRAINT "consultations_medical_record_id_fkey";

-- DropIndex
DROP INDEX "consultations_medical_record_id_key";

-- AlterTable
ALTER TABLE "consultations" DROP COLUMN "medical_record_id";

-- AlterTable
ALTER TABLE "medical_records" ALTER COLUMN "consultations_ids" DROP NOT NULL,
ALTER COLUMN "consultations_ids" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_consultations_ids_fkey" FOREIGN KEY ("consultations_ids") REFERENCES "consultations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
