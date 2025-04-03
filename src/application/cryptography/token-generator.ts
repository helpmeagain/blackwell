export abstract class TokenGenerator {
  abstract generate(): Promise<string>;
}