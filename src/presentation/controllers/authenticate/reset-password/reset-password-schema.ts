import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const authenticateBodySchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .openapi({ example: 'Password' }),
  })
  .openapi('User');

export const detailedDescription =
  "Reset password after receiving a token in the user's email address. " +
  'The token is valid for 1 hour. If the token is expired, the user must request a new one.';

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
