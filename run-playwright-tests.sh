#!/bin/bash
echo "********** Installing packages and running linting ********** "

# Run Playwright tests using npx
npm install
npx playwright install
npm run lint
echo "********** Test Execution Started ********** "
npm run test
echo "********** Test Execution Finished ********** "
