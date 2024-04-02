import { type Page, type Locator, expect } from '@playwright/test';
import { PageUtils } from '../../utils/page-utils';

export class AddBetPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  /** Function to compare race card name from home page and add bet page */

  async verifySelectedRaceCard(selectedRaceCard: string): Promise<void> {
    const displayedRaceCard = await this.raceCardTitle().textContent();
    console.log(`add bet page horse ${displayedRaceCard}`);

    expect(displayedRaceCard).toEqual(selectedRaceCard);
  }

  /** Function to add two unique race card outcomes and verify the name against bet slip name */

  async addRaceCardOutcomeAndVerifyOnBetSlip(raceCardOutcomeToAddCount: number): Promise<void> {
    const raceCardNumberToAddList = await this.generateRandomRaceCardIndexToAdd(raceCardOutcomeToAddCount);
    const randomRaceCardsToAddNameList = await this.getRaceCardOutcomeToAddList(raceCardNumberToAddList);
    await this.addRandomRaceCardOutcome(raceCardNumberToAddList);
    await this.verifyAddedRaceCardsInBetSlip(randomRaceCardsToAddNameList);
  }

  /** Function to add two unique race card outcomes and verify the name against bet slip name */

  async generateRandomRaceCardIndexToAdd(raceCardOutcomeToAddCount: number) {
    await this.raceCardOutcomeWinList().first().waitFor({ state: 'visible' });
    const raceCardOutcomeAvailableCount = await this.raceCardOutcomeWinList().count();
    const raceCardNumberToAddList = PageUtils.generateListOfUniqueRandomNumbers(1, raceCardOutcomeAvailableCount, raceCardOutcomeToAddCount);
    return raceCardNumberToAddList;
  }

  /** Function to generate a list of two unique race card outcomes to be added */

  async getRaceCardOutcomeToAddList(raceCardNumberList: number[]) {
    const raceCardOutcomeToAddList: string[] = (await Promise.all(
      raceCardNumberList.map(async (raceCardNumber) => {
        const raceCardNameText = await this.raceCardOutcomeList(raceCardNumber).textContent();
        return raceCardNameText?.replace(/\u00A0/g, ' ').trim();
      }),
    )) as string[];
    return raceCardOutcomeToAddList;
  }

  /** Function to add two unique race card outcomes */

  async addRandomRaceCardOutcome(raceCardNumberList: number[]): Promise<void> {
    await Promise.all(
      raceCardNumberList.map(async (raceCardNumber) => {
        console.log(`adding race card number ${raceCardNumber}`);
        const raceCardNumberToAdd = this.raceCardToAdd(raceCardNumber);
        await raceCardNumberToAdd.scrollIntoViewIfNeeded();
        await raceCardNumberToAdd.waitFor({ state: 'visible' });
        await expect(raceCardNumberToAdd).toBeVisible();
        if (await raceCardNumberToAdd.isVisible()) {
          await raceCardNumberToAdd.click();
          console.log(`added race card number ${raceCardNumber}`);
        } else throw new Error(`racecard number to be added ${raceCardNumber} is not visible`);
        if (await this.betSlipPanel().isVisible()) {
          await this.betSlipCloseButton().click();
        }

        if (!(await this.raceCardSelected(raceCardNumber).isVisible())) {
          await raceCardNumberToAdd.click();
        }
      }),
    );
  }

  /** Function to compare the added race card otucome against bet slip names */

  async verifyAddedRaceCardsInBetSlip(randomRaceCardsToAddNameList: string[]): Promise<void> {
    await this.betSlipButton().click();
    const betcount = await this.betSlipBetTitleList().count();
    console.log(`betCount is ${betcount}`);
    const randomRaceCardsAddedNameList = await this.betSlipBetTitleList().allTextContents();
    console.log('bets to add ', randomRaceCardsToAddNameList);
    console.log('bets added ', randomRaceCardsAddedNameList);
    expect([...randomRaceCardsAddedNameList].sort()).toEqual([...randomRaceCardsToAddNameList].sort());
  }

  /** Function to get the count of bets added on bet slip header*/
  async verifyBetCountOnBetSlip(raceCardOutcomeToAddCount: number): Promise<void> {
    const raceCardNumberToAddList = await this.generateRandomRaceCardIndexToAdd(raceCardOutcomeToAddCount);
    await this.addRandomRaceCardOutcome(raceCardNumberToAddList);
    await this.verifyBetCount(raceCardOutcomeToAddCount);
  }

  /** Function to verify bet count on bet slip */

  async verifyBetCount(raceCardOutcomeToAddCount: number): Promise<void> {
    await this.betSlipButton().click();
    const betTitleCount = await this.betSlipBetTitleList().count();
    expect(betTitleCount).toEqual(raceCardOutcomeToAddCount);
    const betCountOnBetSlip = (await this.betCount().first().textContent())!;
    expect(parseInt(betCountOnBetSlip, 10)).toEqual(raceCardOutcomeToAddCount);
  }

  private readonly raceCardTitle = (): Locator => this.page.locator('[data-automation-id="contextual-nav-title-select"] > h1');
  private readonly raceCardToAdd = (raceCardNumber: number): Locator => this.page.locator(`(//div[@data-automation-id="racecard-outcome-0-L-price"])[${raceCardNumber}]//div[@data-automation-id="racecard-price-button-deselected"]`);
  private readonly raceCardSelected = (raceCardNumber: number): Locator => this.page.locator(`(//div[@data-automation-id="racecard-outcome-0-L-price"])[${raceCardNumber}]//div[@data-automation-id="racecard-price-button-selected"]`);
  private readonly raceCardOutcomeWinList = (): Locator => this.page.locator('//div[@data-automation-id="racecard-outcome-0-L-price"]');
  private readonly raceCardOutcomeList = (raceCardNumber: number): Locator => this.page.locator(`(//div[@data-automation-id="racecard-outcome-name"])[${raceCardNumber}]`);
  private readonly betSlipPanel = (): Locator => this.page.getByTestId('layout-right-panel');
  private readonly betSlipCloseButton = (): Locator => this.page.getByTestId('betslip-header-hide');
  private readonly betSlipButton = (): Locator => this.page.getByTestId('header-betslip-touchable');
  private readonly betSlipBetTitleList = (): Locator => this.page.getByTestId('betslip-bet-title');
  private readonly betCount = (): Locator => this.page.getByTestId('header-bet-count');
}
