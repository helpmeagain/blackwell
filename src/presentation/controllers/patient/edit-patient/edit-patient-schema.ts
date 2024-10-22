import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editPatientSchema = z
  .object({
    name: z.string().optional().openapi({ example: 'Jane' }),
    surname: z.string().optional().openapi({ example: 'Doe' }),
    gender: z
      .enum(['male', 'female', 'nonbinary', 'other'])
      .optional()
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
      .optional()
      .openapi({ example: '2001-01-01T00:00:00.000Z' }),
    cpf: z.string().length(11).optional().openapi({ example: '11111111111' }),
    phoneNumber: z.string().optional().openapi({ example: '9999999999' }),
    address: z.string().optional().openapi({ example: '123 Main St' }),
    city: z.string().optional().openapi({ example: 'Fortaleza' }),
    state: z.string().optional().openapi({ example: 'Ceará' }),
    email: z.string().email().optional().openapi({ example: 'janedoe@email.com' }),
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
  .openapi('Patient');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editPatientSchema);
