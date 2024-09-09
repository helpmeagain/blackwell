export function maskPassword(password: string): string {
  return '*'.repeat(password.length);
}
