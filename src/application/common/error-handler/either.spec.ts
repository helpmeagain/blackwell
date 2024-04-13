import { Either, left, right } from './either';

function doSomething(shouldSuccess: boolean): Either<string, string> {
  return shouldSuccess ? right('success') : left('error');
}

test('success result', () => {
  const result = doSomething(true);
  expect(result.isRight()).toBe(true);
  expect(result.isLeft()).toBe(false);
  expect(result.value).toEqual('success');
});

test('error result', () => {
  const result = doSomething(false);
  expect(result.isRight()).toBe(false);
  expect(result.isLeft()).toBe(true);
  expect(result.value).toEqual('error');
});
