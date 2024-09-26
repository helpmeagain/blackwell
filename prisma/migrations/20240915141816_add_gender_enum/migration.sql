/*
  Warnings:

  - Changed the type of `gender` on the `clinicians` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `patients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'nonbinary', 'other');

-- AlterTable
ALTER TABLE "clinicians" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
