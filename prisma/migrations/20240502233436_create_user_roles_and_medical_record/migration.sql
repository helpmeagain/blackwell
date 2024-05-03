/*
  Warnings:

  - You are about to drop the `Consultation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[medical_record_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EMPLOYEE', 'CLIENT');

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_clinician_id_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_patient_id_fkey";

-- AlterTable
ALTER TABLE "clinicians" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'EMPLOYEE';

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "medical_record_id" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CLIENT';

-- DropTable
DROP TABLE "Consultation";

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "clinician_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "medicalRecordId" TEXT NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_records" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "consultations_ids" TEXT[],
    "diagnosis" TEXT NOT NULL,
    "comorbidity" TEXT NOT NULL,

    CONSTRAINT "medical_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medical_records_patient_id_key" ON "medical_records"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_medical_record_id_key" ON "patients"("medical_record_id");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_medical_record_id_fkey" FOREIGN KEY ("medical_record_id") REFERENCES "medical_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_clinician_id_fkey" FOREIGN KEY ("clinician_id") REFERENCES "clinicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
