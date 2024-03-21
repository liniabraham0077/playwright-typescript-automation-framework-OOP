import { rm } from 'fs/promises';

/** Global set up function to clean up allure results folder before test execution*/
async function globalSetup(): Promise<void> {
  await rm('./allure-results', { recursive: true, force: true });
}

export default globalSetup;
