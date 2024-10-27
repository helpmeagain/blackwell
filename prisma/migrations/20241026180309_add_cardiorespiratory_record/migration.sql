-- CreateEnum
CREATE TYPE "NasalSecretionType" AS ENUM ('purulent', 'mucopurulent', 'mucoid', 'piohematic', 'hematic', 'rosacea', 'greenish', 'yellowish');

-- CreateEnum
CREATE TYPE "NasalSecretionQuantity" AS ENUM ('large', 'moderate', 'small', 'absent');

-- CreateEnum
CREATE TYPE "PhysicalInspectionNasalItching" AS ENUM ('intermittent', 'persistent', 'absent');

-- CreateEnum
CREATE TYPE "PhysicalInspectionChestType" AS ENUM ('kyphotic', 'scoliotic', 'kyphoscoliotic', 'barrel', 'hourglass', 'pectusExcavatum', 'pectusCarinatum', 'normal', 'charpyAngle');

-- CreateEnum
CREATE TYPE "PhysicalInspectionRespiratoryOrCardiacSigns" AS ENUM ('accessory', 'retractions', 'hooverSign', 'digitalClubbing', 'jugularVenousDistension', 'normal');

-- CreateTable
CREATE TABLE "CardiorespiratoryRecord" (
    "id" TEXT NOT NULL,
    "clinicianId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "universalMedicalRecordId" TEXT NOT NULL,
    "medicalDiagnosis" TEXT NOT NULL,
    "anamnesis" TEXT NOT NULL,
    "physicalExamination" TEXT NOT NULL,
    "physiotherapyDepartment" "PhysiotherapyDepartment" NOT NULL,
    "triage" "Triage" NOT NULL,
    "authorizedUsers" TEXT[],
    "pendingAuthorizationUsers" TEXT[],
    "alcoholConsumption" BOOLEAN NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "obesity" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "drugUser" BOOLEAN NOT NULL,
    "physicalActivity" BOOLEAN NOT NULL,
    "isFaceSinusPalpationHurtful" BOOLEAN NOT NULL,
    "type" "NasalSecretionType" NOT NULL,
    "isFetid" BOOLEAN NOT NULL,
    "quantity" "NasalSecretionQuantity" NOT NULL,
    "nasalItching" "PhysicalInspectionNasalItching" NOT NULL,
    "sneezing" "PhysicalInspectionNasalItching" NOT NULL,
    "chestType" "PhysicalInspectionChestType" NOT NULL,
    "respiratoryOrCardiacSigns" "PhysicalInspectionRespiratoryOrCardiacSigns" NOT NULL,
    "heartRate" DOUBLE PRECISION NOT NULL,
    "respiratoryRate" DOUBLE PRECISION NOT NULL,
    "systolic" DOUBLE PRECISION NOT NULL,
    "diastolic" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "oxygenSaturation" DOUBLE PRECISION NOT NULL,
    "firstMeasurement" DOUBLE PRECISION NOT NULL,
    "secondMeasurement" DOUBLE PRECISION NOT NULL,
    "thirdMeasurement" DOUBLE PRECISION NOT NULL,
    "pemaxFirstMeasurement" DOUBLE PRECISION NOT NULL,
    "pemaxSecondMeasurement" DOUBLE PRECISION NOT NULL,
    "pemaxThirdMeasurement" DOUBLE PRECISION NOT NULL,
    "pimaxFirstMeasurement" DOUBLE PRECISION NOT NULL,
    "pimaxSecondMeasurement" DOUBLE PRECISION NOT NULL,
    "pimaxThirdMeasurement" DOUBLE PRECISION NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "abdominalPerimeter" DOUBLE PRECISION NOT NULL,
    "waistHipRatio" DOUBLE PRECISION NOT NULL,
    "bodyFat" DOUBLE PRECISION NOT NULL,
    "visceralFat" DOUBLE PRECISION NOT NULL,
    "muscleMassPercentage" DOUBLE PRECISION NOT NULL,
    "bicipital" DOUBLE PRECISION NOT NULL,
    "tricipital" DOUBLE PRECISION NOT NULL,
    "subscapular" DOUBLE PRECISION NOT NULL,
    "abdominal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CardiorespiratoryRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardiorespiratoryRecord_patientId_key" ON "CardiorespiratoryRecord"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "CardiorespiratoryRecord_universalMedicalRecordId_key" ON "CardiorespiratoryRecord"("universalMedicalRecordId");

-- AddForeignKey
ALTER TABLE "CardiorespiratoryRecord" ADD CONSTRAINT "CardiorespiratoryRecord_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "clinicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardiorespiratoryRecord" ADD CONSTRAINT "CardiorespiratoryRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardiorespiratoryRecord" ADD CONSTRAINT "CardiorespiratoryRecord_universalMedicalRecordId_fkey" FOREIGN KEY ("universalMedicalRecordId") REFERENCES "universal_medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
