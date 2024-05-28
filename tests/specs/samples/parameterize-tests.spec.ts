import { test } from '../../fixtures/fixtures';

test.beforeAll('beforeAll function', () => {
  console.log(`this is a before all function in params`);
});

test.afterAll('beforeAll function', () => {
  console.log(`this is an after all function in params`);
});

test.describe('Parameterize test using map', () => {
  const myMap = new Map<string, string>([
    ['key1', 'value1'],
    ['key2', 'value2'],
  ]);
  for (const [k, v] of myMap) {
    // eslint-disable-next-line @typescript-eslint/require-await
    test(`testing with ${k} ${v}`, { tag: ['@addBet', '@vrt'] }, async () => {
      console.log(`${k}    ${v}`);
    });
  }
});
