import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
const createCardiorespiratoryRecordSchema = z
  .object({
    medicalDiagnosis: z
      .string()
      .openapi({ example: 'Nothing. No diagnosis whatsoever.' }),
    anamnesis: z.string().openapi({
      example: 'Pacient anamnesis. An history of the disease and other things.',
    }),
    physicalExamination: z.string().openapi({
      example:
        'The physical state of the patient. ' +
        'Important information about the situation will be included here.',
    }),
    triage: z.enum(['orange', 'yellow', 'green', 'blue']).openapi({ example: 'blue' }),
    lifestyleHabits: z.object({
      alcoholConsumption: z.boolean().openapi({ example: false }),
      smoker: z.boolean().openapi({ example: false }),
      obesity: z.boolean().openapi({ example: false }),
      diabetes: z.boolean().openapi({ example: false }),
      drugUser: z.boolean().openapi({ example: false }),
      physicalActivity: z.boolean().openapi({ example: false }),
    }),
    physicalInspection: z.object({
      isFaceSinusPalpationHurtful: z.boolean().openapi({ example: false }),
      nasalSecretion: z.object({
        type: z
          .enum([
            'purulent',
            'mucopurulent',
            'mucoid',
            'piohematic',
            'hematic',
            'rosacea',
            'greenish',
            'yellowish',
          ])
          .openapi({ example: 'purulent' }),
        isFetid: z.boolean().openapi({ example: false }),
        quantity: z
          .enum(['large', 'moderate', 'small', 'absent'])
          .openapi({ example: 'large' }),
      }),
      nasalItching: z
        .enum(['intermittent', 'persistent', 'absent'])
        .openapi({ example: 'intermittent' }),
      sneezing: z.enum(['intermittent', 'persistent', 'absent']).openapi({ example: 'intermittent' }),
      chestType: z
        .enum([
          'kyphotic',
          'scoliotic',
          'kyphoscoliotic',
          'barrel',
          'hourglass',
          'pectusExcavatum',
          'pectusCarinatum',
          'normal',
          'charpyAngle',
        ])
        .openapi({ example: 'kyphotic' }),
      respiratoryOrCardiacSigns: z
        .enum([
          'accessory',
          'retractions',
          'hooverSign', 
          'digitalClubbing', 
          'jugularVenousDistension', 
          'normal'
        ])
        .openapi({ example: 'accessory' }),
    }),
    VitalSigns: z.object({
      heartRate: z.number().openapi({ example: 0 }),
      respiratoryRate: z.number().openapi({ example: 0 }),
      bloodPressure: z.object({
        systolic: z.number().openapi({ example: 0 }),
        diastolic: z.number().openapi({ example: 0 }),
      }),
      temperature: z.number().openapi({ example: 0 }),
      oxygenSaturation: z.number().openapi({ example: 0 }),
    }),
    pneumofunctionalAssessment: z.object({
      peakFlow: z.object({
        firstMeasurement: z.number().openapi({ example: 0 }),
        secondMeasurement: z.number().openapi({ example: 0 }),
        thirdMeasurement: z.number().openapi({ example: 0 }),
      }),
      manovacuometry: z.object({
        pemax: z.object({
          firstMeasurement: z.number().openapi({ example: 0 }),
          secondMeasurement: z.number().openapi({ example: 0 }),
          thirdMeasurement: z.number().openapi({ example: 0 }),
        }),
        pimax: z.object({
          firstMeasurement: z.number().openapi({ example: 0 }),
          secondMeasurement: z.number().openapi({ example: 0 }),
          thirdMeasurement: z.number().openapi({ example: 0 }),
        }),
      }),
    }),
    cardiofunctionalAssessment: z.object({
      bmi: z.number().openapi({ example: 0 }),
      abdominalPerimeter: z.number().openapi({ example: 0 }),
      waistHipRatio: z.number().openapi({ example: 0 }),
      bioimpedance: z.object({
        bodyFat: z.number().openapi({ example: 0 }),
        visceralFat: z.number().openapi({ example: 0 }),
        muscleMassPercentage: z.number().openapi({ example: 0 }),
      }),
      adipometry: z.object({
        skinfoldMeasurements: z.object({
          bicipital: z.number().openapi({ example: 0 }),
          tricipital: z.number().openapi({ example: 0 }),
          subscapular: z.number().openapi({ example: 0 }),
          abdominal: z.number().openapi({ example: 0 }),
        }),
      }),
    }),
  })
  .openapi('Cardiorespiratory');

export const detailedDescription =
  'Edit an cardiorespiratory record. All fields are required. ' +
  'This route is protected, only the clinician who created the record can access it.';
export const exampleResponse = {
  message: 'Cardiorespiratory record edited successfully',
  record: {},
};

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(createCardiorespiratoryRecordSchema);
