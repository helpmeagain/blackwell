import { MobilityStatus } from '@/domain/common/types/mobility-status-type';
import { Triage } from '@/domain/common/types/triage-type';

export interface createCardiorespiratoryRecordRequest {
  clinicianId: string;
  patientId: string;
  medicalDiagnosis: string;
  anamnesis: string;
  physicalExamination: string;
  triage: Triage;
  lifestyleHabits: {
    alcoholConsumption: boolean;
    smoker: boolean;
    obesity: boolean;
    diabetes: boolean;
    drugUser: boolean;
    physicalActivity: boolean;
  };
  physicalInspection: {
    isFaceSinusPalpationHurtful: boolean;
    nasalSecretion: {
      type: 'purulent' | 'mucopurulent' | 'mucoid' | 'piohematic' | 'hematic' | 'rosacea' | 'greenish' | 'yellowish';
      isFetid: boolean;
      quantity: 'large' | 'moderate' | 'small' | 'absent';
    };
    nasalItching: 'intermittent' | 'persistent' | 'absent';
    sneezing: 'intermittent' | 'persistent' | 'absent';
    chestType: 'kyphotic' | 'scoliotic' | 'kyphoscoliotic' | 'barrel' | 'hourglass' | 'pectusExcavatum' | 'pectusCarinatum' | 'normal' | 'charpyAngle';
    respiratoryOrCardiacSigns: 'accessory' | 'retractions' | 'hooverSign' | 'digitalClubbing' | 'jugularVenousDistension' | 'normal';
  };
  VitalSigns: {
    heartRate: number; 
    respiratoryRate: number; 
    bloodPressure: {
      systolic: number;
      diastolic: number;
    }; 
    temperature: number; 
    oxygenSaturation: number; 
  },
  pneumofunctionalAssessment: {
    peakFlow: {
      firstMeasurement: number;
      secondMeasurement: number;
      thirdMeasurement: number;
    };
    manovacuometry: {
      pemax: {
        firstMeasurement: number;
        secondMeasurement: number;
        thirdMeasurement: number;
      };
      pimax: {
        firstMeasurement: number;
        secondMeasurement: number;
        thirdMeasurement: number;
      };
    };
  }
  cardiofunctionalAssessment: {
    bmi: number; 
    abdominalPerimeter: number; 
    waistHipRatio: number; 
    bioimpedance: {
      bodyFat: number; 
      visceralFat: number; 
      muscleMassPercentage: number; 
    };
    adipometry: {
      skinfoldMeasurements: {
        bicipital: number;
        tricipital: number;
        subscapular: number;
        abdominal: number;
      };
    };    
  };
}
