import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const authenticateBodySchema = z
  .object({
    email: z.string().email().openapi({ example: 'janedoe@email.com' }),
    password: z.string().openapi({ example: 'Password' }),
  })
  .openapi('Patient');

export const detailedDescription =
  'To authenticate, provide your email and password created in the POST /patients endpoint. ' +
  "After authenticating, you'll receive an access token, " +
  "insert this token in the 'Authorize' button above to access the protected routes. ";

export const exampleResponse = {
  example: {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
};

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(authenticateBodySchema);
