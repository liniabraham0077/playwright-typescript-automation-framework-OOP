import { test } from '../../fixtures/base.page';

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
  test(' @addBet add race card outcome and verify bet count', async ({ addBetPage }) => {
    await addBetPage.verifyBetCountOnBetSlip(2);
  });
});
