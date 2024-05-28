import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/home/home.page';
import { AddBetPage } from '../page-objects/add-bet/add-bet.page';
import AxeBuilder from '@axe-core/playwright';

type Fixtures = {
  homePage: HomePage;
  addBetPage: AddBetPage;
  makeAxeBuilder: AxeBuilder;
};

export const test = base.extend<Fixtures>({
  async homePage({ page }, use) {
    // Set up the fixture.
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();

    // Use the fixture value in the test.
    await use(homePage);
  },
  async addBetPage({ page, homePage }, use) {
    const addBetPage = new AddBetPage(page);
    const selectedRaceCardName = await homePage.selectRaceCardFromGroupOne(1);
    console.log(selectedRaceCardName);
    if (typeof selectedRaceCardName === 'string') {
      await addBetPage.verifySelectedRaceCard(selectedRaceCardName);
    } else throw new Error(`Invalid race card ${selectedRaceCardName}`);
    await use(addBetPage);
  },
  async makeAxeBuilder({ page }, use) {
    await use(new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).exclude('#commonly-reused-element-with-known-issue'));
  },
});
