import { Locator, Page } from '@playwright/test'
import { DistanceUnits } from '../types/enums/DistanceUnits'
import { constData } from '../../factories/utils/constData'

export const getLocator = (page: Page) => (name: string) => page.locator(name)

const setSliderValue = async (
  page: Page,
  locator: Locator,
  inputSelector: Locator,
  distanceValue: number,
  unit = DistanceUnits.IMPERIAL
) => {
  const sliderElement = locator
  const inputElement = inputSelector
  const distance =
    unit === DistanceUnits.IMPERIAL &&
    (await inputElement.textContent()) === 'distance'
      ? Math.ceil(distanceValue * constData.conversionMilesToKm())
      : distanceValue

  await sliderElement.click()

  while (true) {
    const inputValue = await inputElement!.getAttribute('value')

    if (inputValue === distance.toString()) {
      break
    }

    await page.keyboard.press('ArrowRight')
  }
}

const isMetricUnitsActive = async (page: Page) => {
  await page.waitForSelector('div.metric.active')

  const isMetricActive = await page.$eval(
    'div.metric.active',
    (metricDiv, distanceUnit) => {
      return metricDiv && metricDiv.textContent!.trim() === distanceUnit
    },
    DistanceUnits.METRIC
  )

  return isMetricActive
}

export const commonUtils = {
  setSliderValue,
  isMetricUnitsActive
}
