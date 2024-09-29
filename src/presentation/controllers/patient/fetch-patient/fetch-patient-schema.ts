import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
  .openapi('Patient');

const orderByQueryParamSchema = z
  .enum([
    'name',
    'surname',
    'gender',
    'occupation',
    'slug',
    'email',
    'cpf',
    'birthDate',
    'phoneNumber',
    'password',
    'createdAt',
    'updatedAt',
  ])
  .optional()
  .default('createdAt')
  .transform(String)
  .pipe(z.string())
  .openapi('Patient');

const directionQueryParamSchema = z
  .enum(['asc', 'desc'])
  .optional()
  .default('desc')
  .openapi('Patient');

export const detailedDescription =
  'Show 20 patients with pagination. This route have three query params: page, orderBy and direction. ' +
  "If you don't provide any query params, the default values are page = 1, orderBy = createdAt and direction = desc. ";

export const exampleResponse = {
  patients: [
    {
      id: '11111aaa-bbbb-2222-cccc-333333333333',
      universalMedicalRecordId: '22222222-bbbb-4444-cccc-555555555555',
      name: 'Alice',
      surname: 'Wonderland',
      slug: 'alice-wonderland',
      gender: 'female',
      cpf: '11111111111',
      birthDate: '1992-04-15T00:00:00.000Z',
      phoneNumber: '8888888888',
      email: 'alicewonderland@email.com',
      password: '*********',
      createdAt: '2018-11-20T08:45:30.123Z',
      updatedAt: '2020-05-15T10:30:00.000Z',
    },
    {
      id: '66666bbb-ccccc-7777-dddd-888888888888',
      universalMedicalRecordId: '55555bbb-ccccc-4444-dddd-666666666666',
      name: 'Bob',
      surname: 'Builder',
      slug: 'bob-builder',
      gender: 'male',
      cpf: '11111111111',
      birthDate: '1985-06-30T00:00:00.000Z',
      phoneNumber: '7777777777',
      email: 'bobbuilder@email.com',
      password: '*********',
      createdAt: '2018-11-20T08:45:30.123Z',
      updatedAt: '2020-05-15T10:30:00.000Z',
    },
  ],
};

export const {
  swaggerBody: PageSwaggerBody,
  validationBody: PageValidationBody,
  schemaType: PageBodyType,
} = createZodSchemaTools(pageQueryParamSchema);

export const {
  swaggerBody: orderBySwaggerBody,
  validationBody: orderByValidationBody,
  schemaType: orderByBodyType,
} = createZodSchemaTools(orderByQueryParamSchema);

export const {
  swaggerBody: directionSwaggerBody,
  validationBody: directionValidationBody,
  schemaType: directionBodyType,
} = createZodSchemaTools(directionQueryParamSchema);
