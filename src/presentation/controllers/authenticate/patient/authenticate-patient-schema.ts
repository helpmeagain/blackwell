import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const authenticateBodySchema = z
  .object({
    email: z.string().email().openapi({ example: 'janedoe@email.com' }),
    password: z.string().openapi({ example: '12345' }),
  })
  .openapi('Patient');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(authenticateBodySchema);
