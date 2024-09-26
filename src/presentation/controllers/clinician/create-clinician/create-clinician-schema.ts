import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
const createClinicianSchema = z
  .object({
    name: z.string().openapi({ example: 'John' }),
    surname: z.string().openapi({ example: 'Doe' }),
    gender: z.enum(['male', 'female', 'nonbinary', 'other']).openapi({ example: 'male' }),
    occupation: z.string().openapi({ example: 'Cardiologist' }),
    phoneNumber: z.string().openapi({ example: '9999999999' }),
    email: z.string().email().openapi({ example: 'johndoe@email.com' }),
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
  .openapi('Clinician');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(createClinicianSchema);
