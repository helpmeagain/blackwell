import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editUniversalMedicalRecordSchema = z
  .object({
    diagnosis: z.string().openapi({ example: 'Tuberculosis' }),
    comorbidity: z.string().openapi({ example: 'Diabetes' }),
  })
  .openapi('Record');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editUniversalMedicalRecordSchema);
