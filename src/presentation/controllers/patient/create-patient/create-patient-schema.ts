import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const createPatientSchema = z
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
      .openapi({ example: '2000-01-01T00:00:00.000Z' }),
    cpf: z.string().length(11).openapi({ example: '11111111111' }),
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

export const detailedDescription = 'Insert an patient. All fields are required.';

export const exampleResponse = {
  message: 'Patient created successfully',
  patient: {
    id: '77777aaa-bbbb-8888-cccc-999999999999',
    universalMedicalRecord: '22222222-bbbb-4444-cccc-555555555555',
    name: 'Charlie',
    surname: 'Brown',
    slug: 'charlie-brown',
    gender: 'male',
    birthDate: '1988-12-31T00:00:00.000Z',
    cpf: '22222222222',
    phoneNumber: '7777777777',
    email: 'charliebrown@email.com',
    password: '********',
    createdAt: '2018-11-20T08:45:30.123Z',
    updatedAt: '2020-05-15T10:30:00.000Z',
  },
};

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(createPatientSchema);
