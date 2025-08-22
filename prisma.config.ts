import 'dotenv/config';
import type { PrismaConfig } from 'prisma';

export default {
  schema: 'src/infrastructure/persistence/prisma',
  migrations: {
    path: 'src/infrastructure/persistence/prisma/migrations',
  },
} satisfies PrismaConfig;
