export abstract class HashComparator {
  abstract compare(plain: string, hashed: string): Promise<boolean>;
}
