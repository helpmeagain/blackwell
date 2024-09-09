import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editConsultationSchema = z
  .object({
    room: z.number().int().openapi({ example: 1 }),
    appointmentDate: z
      .string()
      .datetime()
      .openapi({ example: '2030-01-01T00:00:00.000Z' }),
  })
  .openapi('Consultation');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editConsultationSchema);
