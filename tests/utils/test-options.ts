import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/home/home.page';
import { AddBetPage } from '../page-objects/add-bet/add-bet.page';

export type TestOptions = {
  navigateToAddBetPage: string;
};

export const test = base.extend<TestOptions>({
  async navigateToAddBetPage({ page }, use) {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    const selectedRaceCardName = await homePage.selectRaceCardFromGroupOne(1);
    const addBetPage = new AddBetPage(page);
    if (typeof selectedRaceCardName === 'string') {
      await addBetPage.verifySelectedRaceCard(selectedRaceCardName);
    } else throw new Error(`Invalid race card ${selectedRaceCardName}`);
    await use('');
  },
});
