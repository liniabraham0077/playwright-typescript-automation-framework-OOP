# sportsbet-coding-challenge

Coding challenge for SportsBet Web Application

## Setup Pre-requisites:

* Ensure that node and java are installed on your machine
* node version 20
* java jdk (11 or above) for allure report
* Docker needs to be installed on the machine if tests need to be executed via docker

## Clone the repository from Github

git clone https://github.com/liniabraham0077/sportsbet-coding-challenge.git

## Execute the following command in order to tests using bash script

```bash
./run-playwright-tests.sh
```

## Install dependencies and browsers using npm commands

```bash
npm install
npx playwright install
```

## Run tests in chrome

npm run test:chrome

## Open allure report
npm run open:allureReport

## Open playwright report
npm run open:playwrightReport

## build docker image from dockerfile

docker build -t sportsbet-automated-tests .

### Run tests using docker-compose file

docker-compose up --build

## 1. Assumptions:

* Locators of UI elements are static
* Live bet is not open - add bet buttons wont be available in that case and tests will fail

## 2. Problems encountered and fixed

* Creating dynamic locators for UI operations by creating page objects with arguments
* Flakiness in tests while adding bets
* Comparing added bets with bets in play slip - fixed it by replacing &nbsp character with space in bet name

## 3. Problems that may arise when test suite grows

* In order to avoid large page files, i have separated page objects and page functions in to different files to make it more simple
* Handling dynamic UI and maintaining large number of tests
* UI elements appear to change with different screen sizes. Test scripts need to be updated to handle different screen resolutions.

## 4. Improvement areas

* Make locators more dynamic
* Dynamically pick race the next race card in a loop if live bet is open or if there is an issue in adding a bet
implement ci/cd
* Allure report works for local execution but code needs to be updated for Docker execution


## Framework Features

Implemented using page object modal using Playwright , typescript
Folder structure:
* tests/page-functions - reusable functions to perform actions on different pages
* tests/page-objects - page objects for different pages in sportsbet application
* tests/specs - tests are placed under this folder
* .env file for passing environment variables
* Tagging is implemented - Required tests can be executed by passing tags from .env file
* tests/utils - common utility functions are placed here and can be expanded based on requirements
* Docker set up is done to run tests on docker container
* Linting and prettier setup - for improving code quality and easy maintenance eslint and prettier are added
* husky for pre-commit checks
* shell script - run-palwright-tests.sh for executing tests via shell script. Arguments can be passed while exeucuting based on the requirement
* cross browser testing with the required browser , browsername can be parameterised as well
* Parallel testing can be achieved by increasing the number of workers
* Reporting using playwright html report and custom report using allure report

