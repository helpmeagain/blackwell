import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const authenticateBodySchema = z
  .object({
    email: z.string().email().openapi({ example: 'johndoe@email.com' }),
  })
  .openapi('User');

export const detailedDescription =
  "Send a token to the user's email address to reset";

export const exampleResponse = {
  example: {
    message: 'Successfully sent email',
    timestamp: new Date().toISOString(),
  },
};

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(authenticateBodySchema);
