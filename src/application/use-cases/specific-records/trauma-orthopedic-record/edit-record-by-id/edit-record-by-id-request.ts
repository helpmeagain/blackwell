import { Triage } from '@/domain/common/types/triage-type';

export interface editTraumaOrthopedicRecordRequest {
  id: string;
  currentUserId: string;
  medicalDiagnosis: string;
  anamnesis: string;
  physicalExamination: string;
  triage: Triage;
  palpation: string;
  edema: boolean;
  pittingTest: boolean;
  fingerPressureTest: boolean;
  perimetry: {
    rightArm: number;
    leftArm: number;
    upperRightThigh: number;
    upperLeftThigh: number;
    lowerRightThigh: number;
    lowerLeftThigh: number;
    rightKnee: number;
    leftKnee: number;
  };
  subjectivePainAssessment: {
    intensity: number;
    location: string;
    characteristic: string;
  };
  specialOrthopedicTest: string;
}
