import { SpecificMedicalRecordProps } from './specific-medical-record';
import { SpecificMedicalRecord } from './specific-medical-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '@/domain/common/types/optional-type';

export interface CardiorespiratoryRecordProps extends SpecificMedicalRecordProps {
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
}

export class CardiorespiratoryRecord extends SpecificMedicalRecord<CardiorespiratoryRecordProps> {
  static create(
    props: Optional<
    CardiorespiratoryRecordProps,
      | 'physiotherapyDepartment'
      | 'createdAt'
      | 'authorizedUsers'
      | 'pendingAuthorizationUsers'
    >,
    id?: UniqueEntityId,
  ) {
    const cardiorespiratoryRecord = new CardiorespiratoryRecord(
      {
        ...props,
        physiotherapyDepartment: 'Neurofunctional',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return cardiorespiratoryRecord;
  }

  get lifestyleHabits() {
    return this.props.lifestyleHabits;
  }

  set lifestyleHabits(value: CardiorespiratoryRecordProps['lifestyleHabits']) {
    this.props.lifestyleHabits = value;
    this.touch();
  }

  get physicalInspection() {
    return this.props.physicalInspection;
  }

  set physicalInspection(value: CardiorespiratoryRecordProps['physicalInspection']) {
    this.props.physicalInspection = value;
    this.touch();
  }

  get vitalSigns() {
    return this.props.VitalSigns;
  }

  set vitalSigns(value: CardiorespiratoryRecordProps['VitalSigns']) {
    this.props.VitalSigns = value;
    this.touch();
  }

  get pneumofunctionalAssessment() {
    return this.props.pneumofunctionalAssessment;
  }

  set pneumofunctionalAssessment(value: CardiorespiratoryRecordProps['pneumofunctionalAssessment']) {
    this.props.pneumofunctionalAssessment = value;
    this.touch();
  }
}