import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
const createTraumaOrthopedicRecordSchema = z
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
    palpation: z.string().openapi({ example: 'Palpation of the patient.' }),
    edema: z.boolean().openapi({ example: true }),
    pittingTest: z.boolean().openapi({ example: false }),
    fingerPressureTest: z.boolean().openapi({ example: true }),
    perimetry: z.object({
      rightArm: z.number().openapi({ example: 3 }),
      leftArm: z.number().openapi({ example: 4 }),
      upperRightThigh: z.number().openapi({ example: 5 }),
      upperLeftThigh: z.number().openapi({ example: 6 }),
      lowerRightThigh: z.number().openapi({ example: 7 }),
      lowerLeftThigh: z.number().openapi({ example: 8 }),
      rightKnee: z.number().openapi({ example: 9 }),
      leftKnee: z.number().openapi({ example: 10 }),
    }),
    subjectivePainAssessment: z.object({
      intensity: z.number().openapi({ example: 5 }),
      location: z.string().openapi({ example: 'Left knee' }),
      characteristic: z.string().openapi({ example: 'Sharp pain' }),
    }),
    specialOrthopedicTest: z.string().openapi({ example: 'Special orthopedic test' }),
  })
  .openapi('TraumaOrthopedic');

export const detailedDescription =
  'Edit an trauma orthopedic record. All fields are required. ' +
  'This route is protected, only the clinician who created the record can access it.';
export const exampleResponse = {
  message: 'Trauma Orthopedic record edited successfully',
  record: {},
};

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(createTraumaOrthopedicRecordSchema);
