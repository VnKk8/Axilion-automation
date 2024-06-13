import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  name: 'Axilion Automation',
  timeout: 180000,
  expect: { timeout: 30000 },
  testDir: './tests',
  outputDir: './test-results/',
  workers: Number(process.env.WORKERS) ? Number(process.env.WORKERS) : 3,
  retries: 1,
  fullyParallel: true,
  reporter: [['html', { outputFolder: './playwright-report/', open: 'never' }]],
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    navigationTimeout: 30000,
    actionTimeout: 30000,
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'AxilionChrome',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-fullscreen argument']
        }
      },
      testMatch: ['**/*.spec.ts']
    }
  ]
})
