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
  .openapi('Clinician');

const orderByQueryParamSchema = z
  .enum([
    'name',
    'surname',
    'gender',
    'occupation',
    'slug',
    'email',
    'phoneNumber',
    'createdAt',
    'updatedAt',
  ])
  .optional()
  .default('createdAt')
  .transform(String)
  .pipe(z.string())
  .openapi('Clinician');

const directionQueryParamSchema = z
  .enum(['asc', 'desc'])
  .optional()
  .default('desc')
  .openapi('Clinician');

export const detailedDescription =
  'Show 20 clinicians with pagination. This route have three query params: page, orderBy and direction. ' +
  "If you don't provide any query params, the default values are page = 1, orderBy = createdAt and direction = desc. ";

export const exampleResponse = {
  clinicians: [
    {
      id: '11111111-aaaa-2222-bbbb-333333333333',
      name: 'Jane',
      surname: 'Smith',
      slug: 'jane-smith',
      gender: 'female',
      occupation: 'Neurologist',
      phoneNumber: '8888888888',
      email: 'janesmith@email.com',
      password: '*********',
      createdAt: '2018-11-20T08:45:30.123Z',
      updatedAt: '2020-05-15T10:30:00.000Z',
    },
    {
      id: '99999999-cccc-8888-dddd-777777777777',
      name: 'John',
      surname: 'Doe',
      slug: 'john-doe',
      gender: 'male',
      occupation: 'Cardiologist',
      phoneNumber: '9999999999',
      email: 'johndoe@email.com',
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
