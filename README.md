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

## Framework Features

Implemented using page object modal using Playwright , typescript
Folder structure:
* tests/page-functions - reusable functions to perform actions on different pages
* tests/page-objects - page objects for different pages in sportsbet application
* tests/specs - tests are placed under this folder
* .env file for passing environment variables
* Tagging is implemented - Required tests can be executed by passing tags from .env file
* tests/utils - common utility functions are placed here and can be expanded based on requirements
* Docker setup is done to run tests on docker container
* Linting and prettier setup - for improving code quality and easy maintenance eslint and prettier are added
* husky for pre-commit checks
* shell script - run-palwright-tests.sh for executing tests via shell script. Arguments can be passed while exeucuting based on the requirement
* cross browser testing with the required browser , browsername can be parameterised as well
* Parallel testing can be achieved by increasing the number of workers
* Reporting using playwright html report and custom report using allure report

