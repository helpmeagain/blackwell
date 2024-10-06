/*
  Warnings:

  - You are about to drop the column `lifestyleHabitsId` on the `NeurofunctionalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `patientMobilityId` on the `NeurofunctionalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `physicalInspectionId` on the `NeurofunctionalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `physiotherapyAssessmentId` on the `NeurofunctionalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `sensoryAssessmentId` on the `NeurofunctionalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `vitalSignsId` on the `NeurofunctionalRecord` table. All the data in the column will be lost.
  - You are about to drop the `CombinedSensations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LifestyleHabits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientMobility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhysicalInspection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhysiotherapyAssessment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostureChanges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensoryAssessment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VitalSigns` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alcoholConsumption` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allFours` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allFoursToKneeling` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barognosis` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodPressure` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyTemperature` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bridge` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cooperative` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deep` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diabetes` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diagnosis` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drag` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugUser` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forearmSupportToAllFours` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullRoll` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graphesthesia` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `halfKneelingLeftToStanding` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `halfKneelingRightToStanding` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasBedsore` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDeformity` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasEdema` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasFallRisk` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHematoma` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasScar` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heartRate` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hydrated` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independentMobility` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kneelingToHalfKneelingLeft` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kneelingToHalfKneelingRight` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nonCooperative` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obesity` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oxygenSaturation` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalActivity` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physiotherapeuticConduct` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proneToForearmSupport` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respiratoryRate` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semiRollLeft` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semiRollRight` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smoker` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stereognosis` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `superficial` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threeMeterWalkTimeInSeconds` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treatmentGoals` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usesCrutches` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usesWalker` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wheelchairUser` to the `NeurofunctionalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_lifestyleHabitsId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_patientMobilityId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_physicalInspectionId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_physiotherapyAssessmentId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_sensoryAssessmentId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_vitalSignsId_fkey";

-- DropForeignKey
ALTER TABLE "PatientMobility" DROP CONSTRAINT "PatientMobility_postureChangesId_fkey";

-- DropForeignKey
ALTER TABLE "SensoryAssessment" DROP CONSTRAINT "SensoryAssessment_combinedSensationsId_fkey";

-- AlterTable
ALTER TABLE "NeurofunctionalRecord" DROP COLUMN "lifestyleHabitsId",
DROP COLUMN "patientMobilityId",
DROP COLUMN "physicalInspectionId",
DROP COLUMN "physiotherapyAssessmentId",
DROP COLUMN "sensoryAssessmentId",
DROP COLUMN "vitalSignsId",
ADD COLUMN     "alcoholConsumption" BOOLEAN NOT NULL,
ADD COLUMN     "allFours" "MobilityStatus" NOT NULL,
ADD COLUMN     "allFoursToKneeling" "MobilityStatus" NOT NULL,
ADD COLUMN     "barognosis" BOOLEAN NOT NULL,
ADD COLUMN     "bloodPressure" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bodyTemperature" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bridge" "MobilityStatus" NOT NULL,
ADD COLUMN     "cooperative" BOOLEAN NOT NULL,
ADD COLUMN     "deep" "DeepSensation" NOT NULL,
ADD COLUMN     "diabetes" BOOLEAN NOT NULL,
ADD COLUMN     "diagnosis" TEXT NOT NULL,
ADD COLUMN     "drag" "MobilityStatus" NOT NULL,
ADD COLUMN     "drugUser" BOOLEAN NOT NULL,
ADD COLUMN     "forearmSupportToAllFours" "MobilityStatus" NOT NULL,
ADD COLUMN     "fullRoll" "MobilityStatus" NOT NULL,
ADD COLUMN     "graphesthesia" BOOLEAN NOT NULL,
ADD COLUMN     "halfKneelingLeftToStanding" "MobilityStatus" NOT NULL,
ADD COLUMN     "halfKneelingRightToStanding" "MobilityStatus" NOT NULL,
ADD COLUMN     "hasBedsore" BOOLEAN NOT NULL,
ADD COLUMN     "hasDeformity" BOOLEAN NOT NULL,
ADD COLUMN     "hasEdema" BOOLEAN NOT NULL,
ADD COLUMN     "hasFallRisk" BOOLEAN NOT NULL,
ADD COLUMN     "hasHematoma" BOOLEAN NOT NULL,
ADD COLUMN     "hasScar" BOOLEAN NOT NULL,
ADD COLUMN     "heartRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hydrated" BOOLEAN NOT NULL,
ADD COLUMN     "independentMobility" BOOLEAN NOT NULL,
ADD COLUMN     "kneelingToHalfKneelingLeft" "MobilityStatus" NOT NULL,
ADD COLUMN     "kneelingToHalfKneelingRight" "MobilityStatus" NOT NULL,
ADD COLUMN     "nonCooperative" BOOLEAN NOT NULL,
ADD COLUMN     "obesity" BOOLEAN NOT NULL,
ADD COLUMN     "oxygenSaturation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "physicalActivity" BOOLEAN NOT NULL,
ADD COLUMN     "physiotherapeuticConduct" TEXT NOT NULL,
ADD COLUMN     "proneToForearmSupport" "MobilityStatus" NOT NULL,
ADD COLUMN     "respiratoryRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "semiRollLeft" "MobilityStatus" NOT NULL,
ADD COLUMN     "semiRollRight" "MobilityStatus" NOT NULL,
ADD COLUMN     "smoker" BOOLEAN NOT NULL,
ADD COLUMN     "stereognosis" BOOLEAN NOT NULL,
ADD COLUMN     "superficial" "SuperficialSensation" NOT NULL,
ADD COLUMN     "threeMeterWalkTimeInSeconds" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "treatmentGoals" TEXT NOT NULL,
ADD COLUMN     "usesCrutches" BOOLEAN NOT NULL,
ADD COLUMN     "usesWalker" BOOLEAN NOT NULL,
ADD COLUMN     "wheelchairUser" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "CombinedSensations";

-- DropTable
DROP TABLE "LifestyleHabits";

-- DropTable
DROP TABLE "PatientMobility";

-- DropTable
DROP TABLE "PhysicalInspection";

-- DropTable
DROP TABLE "PhysiotherapyAssessment";

-- DropTable
DROP TABLE "PostureChanges";

-- DropTable
DROP TABLE "SensoryAssessment";

-- DropTable
DROP TABLE "VitalSigns";

-- DropEnum
DROP TYPE "MobilityLevel";
