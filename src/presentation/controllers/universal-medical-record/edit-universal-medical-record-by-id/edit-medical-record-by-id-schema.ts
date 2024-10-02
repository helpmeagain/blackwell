import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editUniversalMedicalRecordSchema = z
  .object({
    profession: z.string().openapi({ example: 'Teacher' }),
    emergencyContactEmail: z.string().email().openapi({ example: 'emergency@email.com' }),
    emergencyContactNumber: z.string().openapi({ example: '123456789' }),
    maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']).openapi({
      example: 'single',
    }),
    height: z.number().openapi({ example: 180 }),
    weight: z.number().openapi({ example: 80 }),
    allergies: z.array(z.string()).openapi({ example: ['Peanuts', 'Lactose'] }),
    medicationsInUse: z
      .array(z.string())
      .openapi({ example: ['Oseltamivir', 'Paracetamol'] }),
    diagnosis: z.array(z.string()).openapi({ example: ['Flu', 'Cold'] }),
  })
  .openapi('Record');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editUniversalMedicalRecordSchema);
