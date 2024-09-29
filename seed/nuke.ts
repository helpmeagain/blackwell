import { PrismaClient } from '@prisma/client';
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
  const prisma = new PrismaClient();

  const confirmed = await askConfirmation(
    'Do you want to clean the database and apply migrations? (y/n)',
  );

  try {
    if (confirmed) {
      await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "public" CASCADE`);
      execSync('pnpm prisma generate');
      execSync('pnpm prisma migrate deploy');
      console.log('Database cleaned and migrations applied.');
      return true;
    } else {
      console.log('Skipped database cleaning and migrations.');
      return false;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error cleaning the database:', error.message);
    } else {
      console.error('Unknown error occurred while cleaning the database:', error);
    }
    return false;
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

nukeDatabase()
  .then((result) => {
    if (result) {
      console.log('Database nuke completed successfully.');
    } else {
      console.log('Database nuke did not complete successfully.');
    }
  })
  .catch((err) => {
    console.error('Error completing database nuke:', err);
  });
