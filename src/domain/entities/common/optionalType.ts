/**
 * Represents an optional type that allows certain properties of a given type to be optional.
 * 
 * @typeparam T - The original type.
 * @typeparam K - The keys of the properties to make optional.
 * 
 * @example
 * type Person = {
 *  name: string;
 *  age: number;
 * };
 * 
 * Optional<Person, 'age'>;
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;