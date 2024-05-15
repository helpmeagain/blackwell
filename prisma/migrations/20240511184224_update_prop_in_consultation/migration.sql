/*
  Warnings:

  - You are about to drop the column `medicalRecordId` on the `consultations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[medical_record_id]` on the table `consultations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "consultations" DROP CONSTRAINT "consultations_medicalRecordId_fkey";

-- AlterTable
ALTER TABLE "consultations" DROP COLUMN "medicalRecordId",
ADD COLUMN     "medical_record_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "consultations_medical_record_id_key" ON "consultations"("medical_record_id");

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_medical_record_id_fkey" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;
