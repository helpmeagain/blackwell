import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { config } from 'dotenv';
import { execSync } from 'node:child_process';
import { DomainEvents } from '@/domain/common/events/domain-events';
import { envSchema } from '@/infrastructure/env/env';
import Redis from 'ioredis';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = envSchema.parse(process.env)
const prisma = new PrismaClient();
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a database url in the .env file');
  }

  const url = new URL(env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId);
  process.env.DATABASE_URL = databaseUrl;
  DomainEvents.shouldRun = false;
  await redis.flushdb();
  execSync('pnpm prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
