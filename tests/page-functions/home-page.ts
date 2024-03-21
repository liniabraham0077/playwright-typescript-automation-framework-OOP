import { type Page, expect } from '@playwright/test';
import { pageUtils } from '../utils/page-utils';
import { homePageObject } from '../page-objects/home-page-object';

export const homePage = () => {
  /** Function to navigate to sportsbet home page */
  const navigateToHomePage = async (page: Page, hostname: string, path: string) => {
    await pageUtils().navigateTo(page, hostname, path);
    await expect(page).toHaveTitle(/^Best Online Horse Racing \w+ Sports Betting | Sportsbet$/);
    await expect(page.locator(homePageObject.sportsBetLogo)).toBeVisible();
  };

  /** Function to select first race card from sportsbet home page */

  const selectRaceCardFromGroupOne = async (page: Page, horseNumber: number) => {
    await page.locator(homePageObject.getNthHorse(horseNumber)).click();
    // prettier-ignore
    const carouselCellText = await page.locator(homePageObject.getCarouselCellTitle(1, 1)).first()
.textContent();
    return carouselCellText;
  };

  return {
    navigateToHomePage: async (page: Page, hostname: string, path: string) => navigateToHomePage(page, hostname, path),
    selectRaceCardFromGroupOne: async (page: Page, horseNumber: number) => selectRaceCardFromGroupOne(page, horseNumber),
  };
};
