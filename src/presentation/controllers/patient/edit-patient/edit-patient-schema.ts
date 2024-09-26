import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editPatientSchema = z
  .object({
    name: z.string().openapi({ example: 'Jane' }),
    surname: z.string().openapi({ example: 'Doe' }),
    gender: z
      .enum(['male', 'female', 'nonbinary', 'other'])
      .openapi({ example: 'female' }),
    birthDate: z
      .string()
      .datetime()
      .refine(
        (value) => {
          const birthDate = new Date(value);
          const currentDate = new Date();
          return birthDate < currentDate;
        },
        { message: 'Birth date must be in the past' },
      )
      .openapi({ example: '2001-01-01T00:00:00.000Z' }),
    phoneNumber: z.string().openapi({ example: '9999999999' }),
    email: z.string().email().openapi({ example: 'janedoe@email.com' }),
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
  .openapi('Patient');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editPatientSchema);
