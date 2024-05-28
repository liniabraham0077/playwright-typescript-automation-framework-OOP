import { test } from '../../fixtures/fixtures';

test.beforeAll('beforeAll function', () => {
  console.log(`this is a before all function in add bet`);
});

test.afterAll('beforeAll function', () => {
  console.log(`this is an after all function in add bet`);
});

test.describe('Verify add bets feature using a device width of 420 px', () => {
  test.beforeEach(async ({ homePage, addBetPage }) => {
    await homePage.navigateToHomePage();
    const selectedRaceCardName = await homePage.selectRaceCardFromGroupOne(1);
    if (typeof selectedRaceCardName === 'string') {
      await addBetPage.verifySelectedRaceCard(selectedRaceCardName);
    } else throw new Error(`Invalid race card ${selectedRaceCardName}`);
  });
  test(' @addBet add two unique bets and verify if added correctly', async ({ addBetPage }) => {
    await addBetPage.addRaceCardOutcomeAndVerifyOnBetSlip(2);
  });
  test(' @no add race card outcome and verify bet count', async ({ addBetPage }) => {
    await addBetPage.verifyBetCountOnBetSlip(2);
  });
  const myMap = new Map<string, string>([
    ['key1', 'value1'],
    ['key2', 'value2'],
  ]);
  for (const [k, v] of myMap) {
    // eslint-disable-next-line @typescript-eslint/require-await
    test(`sample test parameterization ${k} ${v}`, { tag: ['@addBet', '@vrt'] }, async () => {
      console.log(`${k}    ${v}`);
    });
    // You can also do it with test.describe() or with multiple tests as long the test name is unique.
  }
});
