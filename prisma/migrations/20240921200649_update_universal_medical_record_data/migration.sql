/*
  Warnings:

  - You are about to drop the column `comorbidity` on the `universal_medical_records` table. All the data in the column will be lost.
  - The `diagnosis` column on the `universal_medical_records` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "universal_medical_records" DROP COLUMN "comorbidity",
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emergency-contact-name" TEXT,
ADD COLUMN     "emergency-contact-number" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "marital-status" TEXT,
ADD COLUMN     "medications-in-use" TEXT,
ADD COLUMN     "profession" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "weight" DOUBLE PRECISION,
DROP COLUMN "diagnosis",
ADD COLUMN     "diagnosis" TEXT[];
