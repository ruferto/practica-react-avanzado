import { getAdverts } from './selectors';

describe('getAdverts', () => {
  const data = [{ name: 'coche' }, { name: 'moto' }];
  test('should return all adverts', () => {
    const result = getAdverts({ adverts: { data } });
    expect(result).toHaveLength(data.length);
  });
  test('should return all adverts ', () => {
    const result = getAdverts({ adverts: { data } });
    expect(result.length).toBe(2);
  });
});
