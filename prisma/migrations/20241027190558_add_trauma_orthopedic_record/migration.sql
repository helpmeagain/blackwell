-- CreateTable
CREATE TABLE "TraumaOrthopedicRecord" (
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
    "palpation" TEXT NOT NULL,
    "edema" BOOLEAN NOT NULL,
    "pittingTest" BOOLEAN NOT NULL,
    "fingerPressureTest" BOOLEAN NOT NULL,
    "rightArm" DOUBLE PRECISION NOT NULL,
    "leftArm" DOUBLE PRECISION NOT NULL,
    "upperRightThigh" DOUBLE PRECISION NOT NULL,
    "upperLeftThigh" DOUBLE PRECISION NOT NULL,
    "lowerRightThigh" DOUBLE PRECISION NOT NULL,
    "lowerLeftThigh" DOUBLE PRECISION NOT NULL,
    "rightKnee" DOUBLE PRECISION NOT NULL,
    "leftKnee" DOUBLE PRECISION NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "characteristic" TEXT NOT NULL,
    "specialOrthopedicTest" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TraumaOrthopedicRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TraumaOrthopedicRecord_patientId_key" ON "TraumaOrthopedicRecord"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "TraumaOrthopedicRecord_universalMedicalRecordId_key" ON "TraumaOrthopedicRecord"("universalMedicalRecordId");

-- AddForeignKey
ALTER TABLE "TraumaOrthopedicRecord" ADD CONSTRAINT "TraumaOrthopedicRecord_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "clinicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraumaOrthopedicRecord" ADD CONSTRAINT "TraumaOrthopedicRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraumaOrthopedicRecord" ADD CONSTRAINT "TraumaOrthopedicRecord_universalMedicalRecordId_fkey" FOREIGN KEY ("universalMedicalRecordId") REFERENCES "universal_medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
