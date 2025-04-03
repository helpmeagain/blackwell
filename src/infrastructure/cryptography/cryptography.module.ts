import { Encrypter } from '@/application/cryptography/encrypter';
import { Module } from '@nestjs/common';
import { JwtEncrypter } from './jwt-encrypter';
import { HashComparator } from '@/application/cryptography/hash-comparator';
import { BcryptHasher } from './bcrypt-hasher';
import { HashGenerator } from '@/application/cryptography/hash-generator';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenGenerator } from './jwt-token-generator';
import { TokenGenerator } from '@/application/cryptography/token-generator';
import { envSchema } from '../env/env';
import { NodemailerEmailSender } from './nodemailer-email-sender';
import { EmailSender } from '@/application/cryptography/email-sender';
import { EnvService } from '../env/env.service';

@Module({
  providers: [
    EnvService,
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparator, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: TokenGenerator, useClass: JwtTokenGenerator },
    { provide: EmailSender, useClass: NodemailerEmailSender },
  ],
  exports: [Encrypter, HashComparator, HashGenerator, TokenGenerator, EmailSender],
})
export class CryptographyModule {}
