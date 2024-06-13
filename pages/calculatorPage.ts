import { Page } from '@playwright/test'
import { expect } from '../pages/fixtures'
import { commonUtils, getLocator } from './utils/common'
import { data } from '../data/crossEnvironmentData'
import { XWayServices } from './types/enums/XWayServices'
import { calculatorPageFactory } from '../factories/calculatorPageFactory'
import { DistanceUnits } from './types/enums/DistanceUnits'

const getLocators = (page: Page) => {
  const locator = getLocator(page)

  return {
    serviceDropdown: page.getByRole('button', { name: XWayServices.Pulse }),
    serviceOptions: (serviceOption: XWayServices) =>
      page.getByRole('option', { name: `${serviceOption}` }),
    saasPrice: page.getByTestId('plan-price-line-1'),
    roadLengthSlider: page.getByTestId('slider-distance').getByRole('slider'),
    numberOfSignalizedIntersectionsSlider: page
      .getByTestId('slider-intersections')
      .getByRole('slider'),
    distanceUnits: page.getByRole('button', { name: 'METRIC IMPERIAL' }),
    inputRoadLenght: locator(
      'div[data-testid="slider-distance"] input[type=hidden]'
    ),
    inputNumberOfSignalizedIntersections: locator(
      'div[data-testid="slider-intersections"] input[type=hidden]'
    )
  }
}

const getActions = (page: Page) => {
  const locators = getLocators(page)

  const openAxilionPage = async () => {
    await page.goto(data.urls.urlAxilionCalculator)
    await page.waitForLoadState('load')
  }

  const selectService = async (serviceOption: XWayServices) => {
    await locators.serviceDropdown.click()
    await locators.serviceOptions(serviceOption).click()
  }

  const setRoadLenght = async (
    roadLenght: number,
    distanceUnits = DistanceUnits.METRIC
  ) => {
    if (
      (await commonUtils.isMetricUnitsActive(page)) &&
      distanceUnits === DistanceUnits.IMPERIAL
    ) {
      await locators.distanceUnits.click()
    }

    await commonUtils.setSliderValue(
      page,
      locators.roadLengthSlider,
      locators.inputRoadLenght,
      roadLenght,
      distanceUnits
    )
  }

  const setNumberOfSignalizedIntersections = async (
    numberOfIntersections: number
  ) =>
    commonUtils.setSliderValue(
      page,
      locators.numberOfSignalizedIntersectionsSlider,
      locators.inputNumberOfSignalizedIntersections,
      numberOfIntersections
    )

  return {
    openAxilionPage,
    selectService,
    setRoadLenght,
    setNumberOfSignalizedIntersections
  }
}

const getExpectations = (page: Page) => {
  const locators = getLocators(page)

  const verifySaaSPriceDependOfParameters = async (
    roadLenght: number,
    numberOfSignalizedIntersections: number,
    xWayService: XWayServices,
    distanceUnits = DistanceUnits.METRIC
  ) => {
    const calculationResult = await calculatorPageFactory.calculateSaaSPrice(
      roadLenght,
      numberOfSignalizedIntersections,
      xWayService,
      distanceUnits
    )

    await expect
      .soft(locators.saasPrice)
      .toHaveText(
        `SaaS Price*: $${calculationResult.toLocaleString('fr-FR')} per month`
      )
  }

  return { verifySaaSPriceDependOfParameters }
}

export const buildCalculatorPage = (page: Page) => ({
  locators: getLocators(page),
  actions: getActions(page),
  expectations: getExpectations(page)
})

export type CalculatorPage = ReturnType<typeof buildCalculatorPage>
