import { Slug } from './slug';

test('it should be able to create a new slug', () => {
  const slug = Slug.createFromText('This is a slug');
  expect(slug.value).toEqual('this-is-a-slug');
});

test('it should be able to create a new slug', () => {
  const slug = Slug.createFromText('Ação de Graças');
  expect(slug.value).toEqual('acao-de-gracas');
});
