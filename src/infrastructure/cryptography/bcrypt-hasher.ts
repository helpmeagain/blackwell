import { HashComparator } from '@/application/cryptography/hash-comparator';
import { HashGenerator } from '@/application/cryptography/hash-generator';
import { hash, compare } from 'bcryptjs';

export class BcryptHasher implements HashGenerator, HashComparator {
  private HASH_SALT = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
