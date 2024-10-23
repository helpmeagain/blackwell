import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editClinicianSchema = z
  .object({
    name: z.string().optional().openapi({ example: 'John' }),
    surname: z.string().optional().openapi({ example: 'Doe' }),
    gender: z
      .enum(['male', 'female', 'nonbinary', 'other'])
      .optional()
      .openapi({ example: 'male' }),
    occupation: z.string().optional().openapi({ example: 'Dermatology ' }),
    phoneNumber: z.string().optional().openapi({ example: '9999999999' }),
    email: z.string().email().optional().openapi({ example: 'johndoe@email.com' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter',
      })
      .optional()
      .openapi({ example: 'Password' }),
  })
  .openapi('Clinician');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editClinicianSchema);
