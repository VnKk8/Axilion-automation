import { Pages } from './types/Pages'
import { test as baseTest } from '@playwright/test'
import { buildCalculatorPage } from './calculatorPage'

type TestOptions = Pages

export const test = baseTest.extend<TestOptions>({
  calculatorPage: async ({ page }, use) => {
    await use(buildCalculatorPage(page))
  }
})

export { expect } from '@playwright/test'
