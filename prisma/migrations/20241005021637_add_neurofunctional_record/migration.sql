-- CreateEnum
CREATE TYPE "PhysiotherapyDepartment" AS ENUM ('Orthopedic', 'Neurofunctional', 'Cardiorespiratory');

-- CreateEnum
CREATE TYPE "Triage" AS ENUM ('orange', 'yellow', 'green', 'blue');

-- CreateEnum
CREATE TYPE "SuperficialSensation" AS ENUM ('Tactile', 'Thermal', 'Painful');

-- CreateEnum
CREATE TYPE "DeepSensation" AS ENUM ('PositionSense', 'MovementSense');

-- CreateEnum
CREATE TYPE "MobilityStatus" AS ENUM ('Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform');

-- CreateEnum
CREATE TYPE "MobilityLevel" AS ENUM ('Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform');

-- CreateTable
CREATE TABLE "NeurofunctionalRecord" (
    "id" TEXT NOT NULL,
    "clinicianId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "universalMedicalRecordId" TEXT NOT NULL,
    "medicalDiagnosis" TEXT NOT NULL,
    "anamnesis" TEXT NOT NULL,
    "physicalExamination" TEXT NOT NULL,
    "physiotherapyDepartment" "PhysiotherapyDepartment" NOT NULL,
    "triage" "Triage" NOT NULL,
    "lifestyleHabitsId" TEXT NOT NULL,
    "vitalSignsId" TEXT NOT NULL,
    "physicalInspectionId" TEXT NOT NULL,
    "sensoryAssessmentId" TEXT NOT NULL,
    "patientMobilityId" TEXT NOT NULL,
    "physiotherapyAssessmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "NeurofunctionalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifestyleHabits" (
    "id" TEXT NOT NULL,
    "alcoholConsumption" BOOLEAN NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "obesity" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "drugUser" BOOLEAN NOT NULL,
    "physicalActivity" BOOLEAN NOT NULL,

    CONSTRAINT "LifestyleHabits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VitalSigns" (
    "id" TEXT NOT NULL,
    "bloodPressure" DOUBLE PRECISION NOT NULL,
    "heartRate" DOUBLE PRECISION NOT NULL,
    "respiratoryRate" DOUBLE PRECISION NOT NULL,
    "oxygenSaturation" DOUBLE PRECISION NOT NULL,
    "bodyTemperature" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VitalSigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysicalInspection" (
    "id" TEXT NOT NULL,
    "independentMobility" BOOLEAN NOT NULL,
    "usesCrutches" BOOLEAN NOT NULL,
    "usesWalker" BOOLEAN NOT NULL,
    "wheelchairUser" BOOLEAN NOT NULL,
    "hasScar" BOOLEAN NOT NULL,
    "hasBedsore" BOOLEAN NOT NULL,
    "cooperative" BOOLEAN NOT NULL,
    "nonCooperative" BOOLEAN NOT NULL,
    "hydrated" BOOLEAN NOT NULL,
    "hasHematoma" BOOLEAN NOT NULL,
    "hasEdema" BOOLEAN NOT NULL,
    "hasDeformity" BOOLEAN NOT NULL,

    CONSTRAINT "PhysicalInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensoryAssessment" (
    "id" TEXT NOT NULL,
    "superficial" "SuperficialSensation" NOT NULL,
    "deep" "DeepSensation" NOT NULL,
    "combinedSensationsId" TEXT NOT NULL,

    CONSTRAINT "SensoryAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombinedSensations" (
    "id" TEXT NOT NULL,
    "graphesthesia" BOOLEAN NOT NULL,
    "barognosis" BOOLEAN NOT NULL,
    "stereognosis" BOOLEAN NOT NULL,

    CONSTRAINT "CombinedSensations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientMobility" (
    "id" TEXT NOT NULL,
    "threeMeterWalkTimeInSeconds" DOUBLE PRECISION NOT NULL,
    "hasFallRisk" BOOLEAN NOT NULL,
    "postureChangesId" TEXT NOT NULL,

    CONSTRAINT "PatientMobility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostureChanges" (
    "id" TEXT NOT NULL,
    "bridge" "MobilityStatus" NOT NULL,
    "semiRollRight" "MobilityStatus" NOT NULL,
    "semiRollLeft" "MobilityStatus" NOT NULL,
    "fullRoll" "MobilityStatus" NOT NULL,
    "drag" "MobilityStatus" NOT NULL,
    "proneToForearmSupport" "MobilityLevel" NOT NULL,
    "forearmSupportToAllFours" "MobilityLevel" NOT NULL,
    "allFours" "MobilityLevel" NOT NULL,
    "allFoursToKneeling" "MobilityLevel" NOT NULL,
    "kneelingToHalfKneelingRight" "MobilityLevel" NOT NULL,
    "kneelingToHalfKneelingLeft" "MobilityLevel" NOT NULL,
    "halfKneelingRightToStanding" "MobilityLevel" NOT NULL,
    "halfKneelingLeftToStanding" "MobilityLevel" NOT NULL,

    CONSTRAINT "PostureChanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysiotherapyAssessment" (
    "id" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatmentGoals" TEXT NOT NULL,
    "physiotherapeuticConduct" TEXT NOT NULL,

    CONSTRAINT "PhysiotherapyAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NeurofunctionalRecord_patientId_key" ON "NeurofunctionalRecord"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "NeurofunctionalRecord_universalMedicalRecordId_key" ON "NeurofunctionalRecord"("universalMedicalRecordId");

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_lifestyleHabitsId_fkey" FOREIGN KEY ("lifestyleHabitsId") REFERENCES "LifestyleHabits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_vitalSignsId_fkey" FOREIGN KEY ("vitalSignsId") REFERENCES "VitalSigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_physicalInspectionId_fkey" FOREIGN KEY ("physicalInspectionId") REFERENCES "PhysicalInspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_sensoryAssessmentId_fkey" FOREIGN KEY ("sensoryAssessmentId") REFERENCES "SensoryAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_patientMobilityId_fkey" FOREIGN KEY ("patientMobilityId") REFERENCES "PatientMobility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_physiotherapyAssessmentId_fkey" FOREIGN KEY ("physiotherapyAssessmentId") REFERENCES "PhysiotherapyAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "clinicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeurofunctionalRecord" ADD CONSTRAINT "NeurofunctionalRecord_universalMedicalRecordId_fkey" FOREIGN KEY ("universalMedicalRecordId") REFERENCES "universal_medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensoryAssessment" ADD CONSTRAINT "SensoryAssessment_combinedSensationsId_fkey" FOREIGN KEY ("combinedSensationsId") REFERENCES "CombinedSensations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMobility" ADD CONSTRAINT "PatientMobility_postureChangesId_fkey" FOREIGN KEY ("postureChangesId") REFERENCES "PostureChanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
