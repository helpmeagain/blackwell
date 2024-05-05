import { Encrypter } from '@/application/cryptography/encrypter';
import { Module } from '@nestjs/common';
import { JwtEncrypter } from './jwt-encrypter';
import { HashComparator } from '@/application/cryptography/hash-comparator';
import { BcryptHasher } from './bcrypt-hasher';
import { HashGenerator } from '@/application/cryptography/hash-generator';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparator, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparator, HashGenerator],
})
export class CryptographyModule {}
