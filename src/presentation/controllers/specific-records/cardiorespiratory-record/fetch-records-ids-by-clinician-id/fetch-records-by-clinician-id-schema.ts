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
  .openapi('Record');

const orderByQueryParamSchema = z
  .enum(['createdAt'])
  .optional()
  .default('createdAt')
  .transform(String)
  .pipe(z.string())
  .openapi('Record');

const directionQueryParamSchema = z
  .enum(['asc', 'desc'])
  .optional()
  .default('desc')
  .openapi('Record');

export const detailedDescription =
  'Fetch cardiorespiratory record ids by clinician id. ' +
  'This route is proceted, only clinicians can access it.';

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
