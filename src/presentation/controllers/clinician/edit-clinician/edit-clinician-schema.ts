import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const editClinicianSchema = z
  .object({
    name: z.string().openapi({ example: 'John' }),
    surname: z.string().openapi({ example: 'Doe' }),
    gender: z
      .enum(['male', 'female', 'non-binary', 'other'])
      .openapi({ example: 'male' }),
    occupation: z.string().openapi({ example: 'Dermatology ' }),
    phoneNumber: z.string().openapi({ example: '9999999999' }),
    email: z.string().email().openapi({ example: 'johndoe@email.com' }),
    password: z.string().openapi({ example: '12345' }),
  })
  .openapi('Clinician');

export const {
  swaggerBody,
  validationBody,
  schemaType: BodyType,
} = createZodSchemaTools(editClinicianSchema);
