import { UniqueEntityId } from './unique-entity-id';

test('it should create a new id', () => {
  const id1 = new UniqueEntityId();
  const id2 = new UniqueEntityId();

  expect(id1.toString()).not.toBeNull();
  expect(id2.toString()).not.toBeNull();
  expect(id1.toString()).not.toEqual(id2.toString());
});
