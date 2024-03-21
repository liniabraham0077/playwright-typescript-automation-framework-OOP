/** Locators for add bet page */
export const addBetPageObject = {
  raceCardTitle() {
    return '[data-automation-id="contextual-nav-title-select"] > h1';
  },
  // prettier-ignore
  raceCardToAdd(raceCardNumber: number): string {
        return '(//div[@data-automation-id="racecard-outcome-0-L-price"])[' + raceCardNumber + ']//div[@data-automation-id="racecard-price-button-deselected"]';
  },

  // prettier-ignore
  raceCardSelected(raceCardNumber: number): string {
    return '(//div[@data-automation-id="racecard-outcome-0-L-price"])[' + raceCardNumber + ']//div[@data-automation-id="racecard-price-button-selected"]';
  },
  raceCardOutcomeWinList: '//div[@data-automation-id="racecard-outcome-0-L-price"]',
  raceCardOutcomeList(raceCardNumber: number): string {
    return '(//div[@data-automation-id="racecard-outcome-name"])[' + raceCardNumber + ']';
  },
};
