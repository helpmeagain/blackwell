/*
  Warnings:

  - You are about to drop the column `emergency-contact-name` on the `universal_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `emergency-contact-number` on the `universal_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `marital-status` on the `universal_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `medications-in-use` on the `universal_medical_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "universal_medical_records" DROP COLUMN "emergency-contact-name",
DROP COLUMN "emergency-contact-number",
DROP COLUMN "marital-status",
DROP COLUMN "medications-in-use",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "emergency_contact_email" TEXT,
ADD COLUMN     "emergency_contact_number" TEXT,
ADD COLUMN     "marital_status" TEXT,
ADD COLUMN     "medications_in_use" TEXT[],
ADD COLUMN     "state" TEXT;
