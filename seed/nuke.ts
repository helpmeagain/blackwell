import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/presentation/app.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { execSync } from 'node:child_process';
import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askConfirmation(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      const normalizedAnswer = answer.toLowerCase().trim();
      resolve(normalizedAnswer === 'y');
    });
  });
}

async function nukeDatabase() {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule, PersistenceModule],
  }).compile();

  const app: INestApplication = moduleRef.createNestApplication();
  const prisma: PrismaService = moduleRef.get(PrismaService);

  await app.init();

  const confirmed = await askConfirmation(
    'Do you want to clean the database and apply migrations? (y/n)',
  );

  if (confirmed) {
    await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS PUBLIC CASCADE`);
    execSync('pnpm prisma migrate deploy');
    console.log('Database cleaned and migrations applied.');
  } else {
    console.log('Skipped database cleaning and migrations.');
  }

  await app.close();
  rl.close();
}

nukeDatabase()
  .then(() => {
    console.log('Database nuke completed.');
  })
  .catch((err) => {
    console.error('Error cleaning the database', err);
  });
