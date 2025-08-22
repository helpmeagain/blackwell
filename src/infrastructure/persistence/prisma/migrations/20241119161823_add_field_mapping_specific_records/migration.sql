/*
  Warnings:

  - You are about to drop the `CardiorespiratoryRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NeurofunctionalRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TraumaOrthopedicRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CardiorespiratoryRecord" DROP CONSTRAINT "CardiorespiratoryRecord_clinicianId_fkey";

-- DropForeignKey
ALTER TABLE "CardiorespiratoryRecord" DROP CONSTRAINT "CardiorespiratoryRecord_patientId_fkey";

-- DropForeignKey
ALTER TABLE "CardiorespiratoryRecord" DROP CONSTRAINT "CardiorespiratoryRecord_universalMedicalRecordId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_clinicianId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_patientId_fkey";

-- DropForeignKey
ALTER TABLE "NeurofunctionalRecord" DROP CONSTRAINT "NeurofunctionalRecord_universalMedicalRecordId_fkey";

-- DropForeignKey
ALTER TABLE "TraumaOrthopedicRecord" DROP CONSTRAINT "TraumaOrthopedicRecord_clinicianId_fkey";

-- DropForeignKey
ALTER TABLE "TraumaOrthopedicRecord" DROP CONSTRAINT "TraumaOrthopedicRecord_patientId_fkey";

-- DropForeignKey
ALTER TABLE "TraumaOrthopedicRecord" DROP CONSTRAINT "TraumaOrthopedicRecord_universalMedicalRecordId_fkey";

-- DropTable
DROP TABLE "CardiorespiratoryRecord";

-- DropTable
DROP TABLE "NeurofunctionalRecord";

-- DropTable
DROP TABLE "TraumaOrthopedicRecord";

-- CreateTable
CREATE TABLE "cardiorespiratory_record" (
    "id" TEXT NOT NULL,
    "clinician_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "universal_medical_record_id" TEXT NOT NULL,
    "medical_diagnosis" TEXT NOT NULL,
    "anamnesis" TEXT NOT NULL,
    "physical_examination" TEXT NOT NULL,
    "physiotherapy_department" "PhysiotherapyDepartment" NOT NULL,
    "triage" "Triage" NOT NULL,
    "authorized_users" TEXT[],
    "pending_authorization_users" TEXT[],
    "alcohol_consumption" BOOLEAN NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "obesity" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "drug_user" BOOLEAN NOT NULL,
    "physical_activity" BOOLEAN NOT NULL,
    "is_face_sinus_palpation_hurtful" BOOLEAN NOT NULL,
    "type" "NasalSecretionType" NOT NULL,
    "is_fetid" BOOLEAN NOT NULL,
    "quantity" "NasalSecretionQuantity" NOT NULL,
    "nasal_itching" "PhysicalInspectionNasalItching" NOT NULL,
    "sneezing" "PhysicalInspectionNasalItching" NOT NULL,
    "chest_type" "PhysicalInspectionChestType" NOT NULL,
    "respiratory_or_cardiac_signs" "PhysicalInspectionRespiratoryOrCardiacSigns" NOT NULL,
    "heart_rate" DOUBLE PRECISION NOT NULL,
    "respiratory_rate" DOUBLE PRECISION NOT NULL,
    "systolic" DOUBLE PRECISION NOT NULL,
    "diastolic" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "oxygen_saturation" DOUBLE PRECISION NOT NULL,
    "first_measurement" DOUBLE PRECISION NOT NULL,
    "second_measurement" DOUBLE PRECISION NOT NULL,
    "third_measurement" DOUBLE PRECISION NOT NULL,
    "pemax_first_measurement" DOUBLE PRECISION NOT NULL,
    "pemax_second_measurement" DOUBLE PRECISION NOT NULL,
    "pemax_third_measurement" DOUBLE PRECISION NOT NULL,
    "pimax_first_measurement" DOUBLE PRECISION NOT NULL,
    "pimax_second_measurement" DOUBLE PRECISION NOT NULL,
    "pimax_third_measurement" DOUBLE PRECISION NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "abdominal_perimeter" DOUBLE PRECISION NOT NULL,
    "waist_hip_ratio" DOUBLE PRECISION NOT NULL,
    "body_fat" DOUBLE PRECISION NOT NULL,
    "visceral_fat" DOUBLE PRECISION NOT NULL,
    "muscle_mass_percentage" DOUBLE PRECISION NOT NULL,
    "bicipital" DOUBLE PRECISION NOT NULL,
    "tricipital" DOUBLE PRECISION NOT NULL,
    "subscapular" DOUBLE PRECISION NOT NULL,
    "abdominal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "cardiorespiratory_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neurofunctional_record" (
    "id" TEXT NOT NULL,
    "clinician_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "universal_medical_record_id" TEXT NOT NULL,
    "medical_diagnosis" TEXT NOT NULL,
    "anamnesis" TEXT NOT NULL,
    "physicalExamination" TEXT NOT NULL,
    "physiotherapyDepartment" "PhysiotherapyDepartment" NOT NULL,
    "triage" "Triage" NOT NULL,
    "authorizedUsers" TEXT[],
    "pendingAuthorizationUsers" TEXT[],
    "alcohol_consumption" BOOLEAN NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "obesity" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "drug_user" BOOLEAN NOT NULL,
    "physical_activity" BOOLEAN NOT NULL,
    "blood_pressure" DOUBLE PRECISION NOT NULL,
    "heart_rate" DOUBLE PRECISION NOT NULL,
    "respiratory_rate" DOUBLE PRECISION NOT NULL,
    "oxygen_saturation" DOUBLE PRECISION NOT NULL,
    "body_temperature" DOUBLE PRECISION NOT NULL,
    "independent_mobility" BOOLEAN NOT NULL,
    "uses_crutches" BOOLEAN NOT NULL,
    "uses_walker" BOOLEAN NOT NULL,
    "wheelchair_user" BOOLEAN NOT NULL,
    "has_scar" BOOLEAN NOT NULL,
    "has_bedsore" BOOLEAN NOT NULL,
    "cooperative" BOOLEAN NOT NULL,
    "non_cooperative" BOOLEAN NOT NULL,
    "hydrated" BOOLEAN NOT NULL,
    "has_hematoma" BOOLEAN NOT NULL,
    "has_edema" BOOLEAN NOT NULL,
    "has_deformity" BOOLEAN NOT NULL,
    "superficial" "SuperficialSensation" NOT NULL,
    "deep" "DeepSensation" NOT NULL,
    "graphesthesia" BOOLEAN NOT NULL,
    "barognosis" BOOLEAN NOT NULL,
    "stereognosis" BOOLEAN NOT NULL,
    "three_meter_walk_time_in_seconds" DOUBLE PRECISION NOT NULL,
    "has_fall_risk" BOOLEAN NOT NULL,
    "bridge" "MobilityStatus" NOT NULL,
    "semi_roll_right" "MobilityStatus" NOT NULL,
    "semi_roll_left" "MobilityStatus" NOT NULL,
    "full_roll" "MobilityStatus" NOT NULL,
    "drag" "MobilityStatus" NOT NULL,
    "prone_to_forearm_support" "MobilityStatus" NOT NULL,
    "forearm_support_to_all_fours" "MobilityStatus" NOT NULL,
    "all_fours" "MobilityStatus" NOT NULL,
    "all_fours_to_kneeling" "MobilityStatus" NOT NULL,
    "kneeling_to_half_kneeling_right" "MobilityStatus" NOT NULL,
    "kneeling_to_half_kneeling_left" "MobilityStatus" NOT NULL,
    "half_kneeling_right_to_standing" "MobilityStatus" NOT NULL,
    "half_kneeling_left_to_standing" "MobilityStatus" NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatment_goals" TEXT NOT NULL,
    "physiotherapeutic_conduct" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "neurofunctional_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trauma_orthopedic_records" (
    "id" TEXT NOT NULL,
    "clinician_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "universal_medical_record_id" TEXT NOT NULL,
    "medical_diagnosis" TEXT NOT NULL,
    "anamnesis" TEXT NOT NULL,
    "physical_examination" TEXT NOT NULL,
    "physiotherapy_department" "PhysiotherapyDepartment" NOT NULL DEFAULT 'Orthopedic',
    "triage" "Triage" NOT NULL,
    "authorized_users" TEXT[],
    "pending_authorization_users" TEXT[],
    "palpation" TEXT NOT NULL,
    "edema" BOOLEAN NOT NULL,
    "pitting_test" BOOLEAN NOT NULL,
    "finger_pressure_test" BOOLEAN NOT NULL,
    "right_arm" DOUBLE PRECISION NOT NULL,
    "left_arm" DOUBLE PRECISION NOT NULL,
    "upper_right_thigh" DOUBLE PRECISION NOT NULL,
    "upper_left_thigh" DOUBLE PRECISION NOT NULL,
    "lower_right_thigh" DOUBLE PRECISION NOT NULL,
    "lower_left_thigh" DOUBLE PRECISION NOT NULL,
    "right_knee" DOUBLE PRECISION NOT NULL,
    "left_knee" DOUBLE PRECISION NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "characteristic" TEXT NOT NULL,
    "special_orthopedic_test" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "trauma_orthopedic_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cardiorespiratory_record_patient_id_key" ON "cardiorespiratory_record"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "cardiorespiratory_record_universal_medical_record_id_key" ON "cardiorespiratory_record"("universal_medical_record_id");

-- CreateIndex
CREATE UNIQUE INDEX "neurofunctional_record_patient_id_key" ON "neurofunctional_record"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "neurofunctional_record_universal_medical_record_id_key" ON "neurofunctional_record"("universal_medical_record_id");

-- CreateIndex
CREATE UNIQUE INDEX "trauma_orthopedic_records_patient_id_key" ON "trauma_orthopedic_records"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "trauma_orthopedic_records_universal_medical_record_id_key" ON "trauma_orthopedic_records"("universal_medical_record_id");

-- AddForeignKey
ALTER TABLE "cardiorespiratory_record" ADD CONSTRAINT "cardiorespiratory_record_clinician_id_fkey" FOREIGN KEY ("clinician_id") REFERENCES "clinicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardiorespiratory_record" ADD CONSTRAINT "cardiorespiratory_record_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardiorespiratory_record" ADD CONSTRAINT "cardiorespiratory_record_universal_medical_record_id_fkey" FOREIGN KEY ("universal_medical_record_id") REFERENCES "universal_medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neurofunctional_record" ADD CONSTRAINT "neurofunctional_record_clinician_id_fkey" FOREIGN KEY ("clinician_id") REFERENCES "clinicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neurofunctional_record" ADD CONSTRAINT "neurofunctional_record_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neurofunctional_record" ADD CONSTRAINT "neurofunctional_record_universal_medical_record_id_fkey" FOREIGN KEY ("universal_medical_record_id") REFERENCES "universal_medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trauma_orthopedic_records" ADD CONSTRAINT "trauma_orthopedic_records_clinician_id_fkey" FOREIGN KEY ("clinician_id") REFERENCES "clinicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trauma_orthopedic_records" ADD CONSTRAINT "trauma_orthopedic_records_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trauma_orthopedic_records" ADD CONSTRAINT "trauma_orthopedic_records_universal_medical_record_id_fkey" FOREIGN KEY ("universal_medical_record_id") REFERENCES "universal_medical_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
