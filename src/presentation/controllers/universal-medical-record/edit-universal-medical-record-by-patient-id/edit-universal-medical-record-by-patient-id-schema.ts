import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editUniversalMedicalRecordSchema = z
  .object({
    diagnosis: z.array(z.string()).openapi({ example: ['Flu', 'Cold'] }),
    profession: z.string().openapi({ example: 'Teacher ' }),
    emergencyContactName: z.string().openapi({ example: 'Mary' }),
    emergencyContactNumber: z.string().openapi({ example: '123456789' }),
    cpf: z.string().openapi({ example: '99999999999' }),
    allergies: z.string().openapi({ example: 'none' }),
    maritalStatus: z.string().openapi({ example: 'single' }),
    height: z.number().openapi({ example: 180 }),
    weight: z.number().openapi({ example: 80 }),
    medicationsInUse: z.string().openapi({ example: 'Rivotril' }),
  })
  .openapi('Record');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editUniversalMedicalRecordSchema);
