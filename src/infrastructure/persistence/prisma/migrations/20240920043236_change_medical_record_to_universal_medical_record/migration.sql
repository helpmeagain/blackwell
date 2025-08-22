/*
  Warnings:

  - You are about to drop the column `medical_record_id` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `medical_record_id` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the `medical_records` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[universal_medical_record_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `universal_medical_record_id` to the `consultations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "consultations" DROP CONSTRAINT "consultations_medical_record_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_medical_record_id_fkey";

-- DropIndex
DROP INDEX "patients_medical_record_id_key";

-- AlterTable
ALTER TABLE "consultations" DROP COLUMN "medical_record_id",
ADD COLUMN     "universal_medical_record_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "medical_record_id",
ADD COLUMN     "universal_medical_record_id" TEXT;

-- DropTable
DROP TABLE "medical_records";

-- CreateTable
CREATE TABLE "universal_medical_records" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "consultations_ids" TEXT[],
    "diagnosis" TEXT,
    "comorbidity" TEXT,

    CONSTRAINT "universal_medical_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "universal_medical_records_patient_id_key" ON "universal_medical_records"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_universal_medical_record_id_key" ON "patients"("universal_medical_record_id");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_universal_medical_record_id_fkey" FOREIGN KEY ("universal_medical_record_id") REFERENCES "universal_medical_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_universal_medical_record_id_fkey" FOREIGN KEY ("universal_medical_record_id") REFERENCES "universal_medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
