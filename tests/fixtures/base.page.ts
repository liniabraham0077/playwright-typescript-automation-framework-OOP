import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/home/home.page';
import { AddBetPage } from '../page-objects/add-bet/add-bet.page';

export const test = base.extend<{
  homePage: HomePage;
  addBetPage: AddBetPage;
}>({
  async homePage({ page }, use) {
    await use(new HomePage(page));
  },
  async addBetPage({ page }, use) {
    await use(new AddBetPage(page));
  },
});
