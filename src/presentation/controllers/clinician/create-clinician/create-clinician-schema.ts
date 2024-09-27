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

export const detailedDescription = 'Insert an clinician. All fields are required.';
export const exampleResponse = {
  message: 'Clinician created successfully',
  clinician: {
    id: '22222222-bbbb-4444-cccc-555555555555',
    name: 'Alice',
    surname: 'Johnson',
    slug: 'alice-johnson',
    gender: 'female',
    occupation: 'Pediatrician',
    phoneNumber: '8888888888',
    email: 'alicejohnson@email.com',
    password: '********',
    createdAt: '2018-11-20T08:45:30.123Z',
    updatedAt: '2020-05-15T10:30:00.000Z',
  },
};

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(createClinicianSchema);
