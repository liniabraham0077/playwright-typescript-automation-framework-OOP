#!/bin/bash
echo "********** Installing packages and running linting ********** "

# Run Playwright tests using npx
npm install
npx playwright install
npm run lint
echo "********** Test Execution Started ********** "
npm run test:chrome
echo "********** Test Execution Finished ********** "
echo "********** Opening Allure Report ********** "
npm run open:allureReport
