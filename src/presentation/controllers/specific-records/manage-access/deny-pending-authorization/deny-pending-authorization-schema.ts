import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createZodSchemaTools } from '@/presentation/utils/create-zod-schema-tools';

extendZodWithOpenApi(z);
const ParamSchema = z.enum(['Neurofunctional', 'Trauma', 'Cardio']).openapi('accessType');

export const {
  swaggerBody: ParamSwaggerBody,
  validationBody: ParamValidationBody,
  schemaType: ParamBodyType,
} = createZodSchemaTools(ParamSchema);

export const detailedDescription =
  'Insert an user id to deny an user. ' +
  'This route is protected, only the patient from the record can access it.';
