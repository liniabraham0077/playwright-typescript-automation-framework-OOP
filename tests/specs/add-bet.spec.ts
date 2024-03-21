import { test } from '@playwright/test';
import { homePage } from '../page-functions/home-page';
import { addBetPage } from '../page-functions/add-bet-page';

test.describe('Verify add bets feature using a device width of 420 px', async () => {
  test(' @addBets add two unique bets using a device width of 420 px', async ({ page }) => {
    await homePage().navigateToHomePage(page, process.env.HOSTNAME!, '/');
    const selectedRaceCardName = await homePage().selectRaceCardFromGroupOne(page, 1);
    if (typeof selectedRaceCardName === 'string') {
      await addBetPage().verifySelectedRaceCard(page, selectedRaceCardName);
    } else throw new Error(`Invalid race card ${selectedRaceCardName}`);
    await addBetPage().addRaceCardOutcomeAndVerifyOnBetSlip(page, 2);
  });
  // test(' @1234 add2 two unique bets using a device width of 420 px', async ({ page }) => {
  //   await homePage().navigateToHomePage(page, process.env.HOSTNAME!, '/');
  //   const selectedRaceCardName = await homePage().selectRaceCardFromGroupOne(page, 1);
  //   if (typeof selectedRaceCardName === 'string') {
  //     await addBetPage().verifySelectedRaceCard(page, selectedRaceCardName);
  //   } else throw new Error(`Invalid race card ${selectedRaceCardName}`);
  //   await addBetPage().addRaceCardOutcomeAndVerifyOnBetSlip(page, 2);
  // });
});
