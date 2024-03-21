import { spawn } from 'child_process';

/** Global tear down function to generate allure report after test execution*/

async function globalTeardown(): Promise<void> {
  const reportError = new Error('Could not generate Allure report');

  await new Promise<void>((resolve, reject) => {
    const generation = spawn('allure', ['generate', 'allure-results', '--clean']);
    const generationTimeout = setTimeout(() => {
      generation.kill(); // Ensure the process is terminated
      reject(reportError);
    }, 60000);

    generation.on('exit', (exitCode) => {
      clearTimeout(generationTimeout);

      if (exitCode === 0) {
        console.log('Allure report successfully generated');
        resolve();
      } else {
        reject(reportError);
      }
    });

    // Capture and log standard error output for diagnostics
    generation.stderr.on('data', (data) => {
      console.error(`Allure generation error: ${data}`);
    });
  });
}

export default globalTeardown;
