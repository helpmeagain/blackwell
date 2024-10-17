import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
const createNeurofunctionalRecordSchema = z
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
    vitalSigns: z.object({
      bloodPressure: z.number().openapi({ example: 0 }),
      heartRate: z.number().openapi({ example: 0 }),
      respiratoryRate: z.number().openapi({ example: 0 }),
      oxygenSaturation: z.number().openapi({ example: 0 }),
      bodyTemperature: z.number().openapi({ example: 0 }),
    }),
    physicalInspection: z.object({
      independentMobility: z.boolean().openapi({ example: false }),
      usesCrutches: z.boolean().openapi({ example: false }),
      usesWalker: z.boolean().openapi({ example: false }),
      wheelchairUser: z.boolean().openapi({ example: false }),
      hasScar: z.boolean().openapi({ example: false }),
      hasBedsore: z.boolean().openapi({ example: false }),
      cooperative: z.boolean().openapi({ example: false }),
      nonCooperative: z.boolean().openapi({ example: false }),
      hydrated: z.boolean().openapi({ example: false }),
      hasHematoma: z.boolean().openapi({ example: false }),
      hasEdema: z.boolean().openapi({ example: false }),
      hasDeformity: z.boolean().openapi({ example: false }),
    }),
    sensoryAssessment: z.object({
      superficial: z
        .enum(['Tactile', 'Thermal', 'Painful'])
        .openapi({ example: 'Tactile' }),
      deep: z
        .enum(['PositionSense', 'MovementSense'])
        .openapi({ example: 'PositionSense' }),
      combinedSensations: z.object({
        graphesthesia: z.boolean().openapi({ example: false }),
        barognosis: z.boolean().openapi({ example: false }),
        stereognosis: z.boolean().openapi({ example: false }),
      }),
    }),
    patientMobility: z.object({
      threeMeterWalkTimeInSeconds: z.number().openapi({ example: 5 }),
      hasFallRisk: z.boolean().openapi({ example: false }),
      postureChanges: z.object({
        bridge: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        semiRollRight: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        semiRollLeft: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        fullRoll: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        drag: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        proneToForearmSupport: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        forearmSupportToAllFours: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        allFours: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        allFoursToKneeling: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        kneelingToHalfKneelingRight: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        kneelingToHalfKneelingLeft: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        halfKneelingRightToStanding: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
        halfKneelingLeftToStanding: z
          .enum(['Independent', 'PartiallyDependent', 'Dependent', 'CannotPerform'])
          .openapi({ example: 'Independent' }),
      }),
    }),
    physiotherapyAssessment: z.object({
      diagnosis: z.string().openapi({ example: 'Here will be the diagnosis' }),
      treatmentGoals: z.string().openapi({
        example: 'Such as exercises, objectives and possibilities for improvement',
      }),
      physiotherapeuticConduct: z
        .string()
        .openapi({ example: 'Here will be the conduct' }),
    }),
  })
  .openapi('Neurofunctional');

export const detailedDescription =
  'Insert an neurofunctional record. All fields are required. ' +
  'This route is protected, only clinicians can access it.';
export const exampleResponse = {
  message: 'Neurofunctional record created successfully',
  record: {},
};

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(createNeurofunctionalRecordSchema);
