import { z } from 'zod';
import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { ZodValidationPipe } from './zod-validation-pipe';

export function createZodSchemaTools<T extends z.ZodTypeAny>(schema: T) {
  const generator = new OpenApiGeneratorV31([schema]);
  const openApiSchema =
    generator.generateComponents().components?.schemas?.[
      Object.keys(generator.generateComponents().components?.schemas || {})[0]
    ];
  const swaggerBody = JSON.parse(JSON.stringify(openApiSchema));
  const validationBody = new ZodValidationPipe(schema);
  type BodyType = z.infer<typeof schema>;

  return {
    swaggerBody,
    validationBody,
    schemaType: undefined as unknown as BodyType,
  };
}
