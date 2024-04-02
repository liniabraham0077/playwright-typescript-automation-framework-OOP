import { type Page, type Locator, expect } from '@playwright/test';
import { PageUtils } from '../../utils/page-utils';

export class HomePage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  /** Function to navigate to sportsbet home page */
  public async navigateToHomePage(): Promise<void> {
    await PageUtils.navigateTo(this.page, process.env.HOSTNAME!, '/');
    await expect(this.page).toHaveTitle(/^Best Online Horse Racing \w+ Sports Betting | Sportsbet$/);
    await expect(this.sportsBetLogo()).toBeVisible();
  }

  /** Function to select first race card from sportsbet home page */

  selectRaceCardFromGroupOne = async (horseNumber: number) => {
    await expect(this.getCarouselCellTitle(1, 1).first()).toBeVisible();
    const carouselCellText = await this.getCarouselCellTitle(1, 1).first().textContent();
    await this.getNthHorse(horseNumber).click();
    return carouselCellText;
  };

  private readonly sportsBetLogo = (): Locator => this.page.getByTestId('sportsbet-logo');
  private readonly getGroupCarousel = (group: number, carousel: number): Locator => this.page.locator(`[data-automation-id="group-${group}-carousel-${carousel}-header-title"]`);

  private readonly getNthHorse = (horseNumber: number): Locator => this.page.locator(`[data-automation-id="group-1-carousel-1-body-container-cell-${horseNumber}"]`);

  private readonly getCarouselCellTitle = (carousel: number, cell: number): Locator => this.page.locator(`[data-automation-id="carousel-${carousel}-cell-${cell}-event-title"]`);
}
