import test from '@playwright/test';

test.beforeAll(' @addBet beforeAll function', () => {
  console.log(`this is a before all function`);
});

test.afterAll('@addBet beforeAll function', () => {
  console.log(`this is an after all function`);
});
