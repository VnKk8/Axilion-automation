import { constData } from '../factories/utils/constData'
import { expect, test } from '../pages/fixtures'
import { DistanceUnits } from '../pages/types/enums/DistanceUnits'
import { XWayServices } from '../pages/types/enums/XWayServices'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ calculatorPage }) =>
  calculatorPage.actions.openAxilionPage()
)

interface InitialCalculationsTestData {
  testCaseTitle: string
  servicePlan: XWayServices
  distanceUnits?: DistanceUnits
  roadLenght?: number
  numberOfIntersections?: number
}

test.describe('Verify SaaS Price calculations for - ', () => {
  test.describe('Initial road lenght/intersections - ', () => {
    const initialCalculationsTestData: InitialCalculationsTestData[] = [
      {
        testCaseTitle: 'Verify initial calculation for X Way Pulse service',
        servicePlan: XWayServices.Pulse
      },
      {
        testCaseTitle:
          'Verify initial calculation for X Way (Pulse + Twin) service',
        servicePlan: XWayServices.PulseTwin
      },
      {
        testCaseTitle:
          'Verify initial calculation for X Way (Pulse + Twin + Neural) service',
        servicePlan: XWayServices.PulseTwinNeural
      }
    ]

    initialCalculationsTestData.forEach(({ testCaseTitle, servicePlan }) => {
      test(`${testCaseTitle} @initialCalculations @SaaSCalculations`, async ({
        calculatorPage
      }) => {
        const initialBoundaries = 1

        await test.step(`Choose a service from the 'Select a Service' dropdown`, async () =>
          calculatorPage.actions.selectService(servicePlan))

        await test.step('Verify the calculation is correct', async () =>
          await calculatorPage.expectations.verifySaaSPriceDependOfParameters(
            initialBoundaries,
            initialBoundaries,
            servicePlan
          ))
      })
    })
  })

  test.describe('Maximum road lenght/intersections - ', () => {
    const initialCalculationsTestData: InitialCalculationsTestData[] = [
      {
        testCaseTitle: 'Verify maximum calculation for X Way Pulse service',
        servicePlan: XWayServices.Pulse,
        distanceUnits: DistanceUnits.METRIC,
        roadLenght: constData.getMaxRoadLenght(DistanceUnits.METRIC),
        numberOfIntersections: constData.getMaxNumberOfInterSections()
      },
      {
        testCaseTitle:
          'Verify maximum calculation for X Way (Pulse + Twin) service',
        servicePlan: XWayServices.PulseTwin,
        distanceUnits: DistanceUnits.IMPERIAL,
        roadLenght: constData.getMaxRoadLenght(DistanceUnits.IMPERIAL),
        numberOfIntersections: constData.getMaxNumberOfInterSections()
      },
      {
        testCaseTitle:
          'Verify maximum calculation for X Way (Pulse + Twin + Neural) service',
        servicePlan: XWayServices.PulseTwinNeural,
        distanceUnits: DistanceUnits.METRIC,
        roadLenght: constData.getMaxRoadLenght(DistanceUnits.METRIC),
        numberOfIntersections: constData.getMaxNumberOfInterSections()
      }
    ]

    initialCalculationsTestData.forEach(
      ({
        testCaseTitle,
        servicePlan,
        distanceUnits,
        roadLenght,
        numberOfIntersections
      }) => {
        test(`${testCaseTitle} @initialCalculations @SaaSCalculations`, async ({
          calculatorPage
        }) => {
          await test.step('Select maximum Road Lenght and Number of Intersections from sliders', async () => {
            await calculatorPage.actions.setRoadLenght(
              roadLenght!,
              distanceUnits!
            )
            await calculatorPage.actions.setNumberOfSignalizedIntersections(
              numberOfIntersections!
            )
          })

          await test.step(`Choose a service from the 'Select a Service' dropdown`, async () =>
            calculatorPage.actions.selectService(servicePlan))

          await test.step('Verify the calculation is correct', async () =>
            await calculatorPage.expectations.verifySaaSPriceDependOfParameters(
              roadLenght!,
              numberOfIntersections!,
              servicePlan,
              distanceUnits!
            ))
        })
      }
    )
  })

  test.describe('Random values for road lenght and number of intersections - ', () => {
    const initialCalculationsTestData: InitialCalculationsTestData[] = [
      {
        testCaseTitle: 'Verify calculation for X Way Pulse service',
        servicePlan: XWayServices.Pulse,
        distanceUnits: DistanceUnits.METRIC,
        roadLenght: faker.number.int({ min: 10, max: 200 }),
        numberOfIntersections: faker.number.int({ min: 10, max: 200 })
      },
      {
        testCaseTitle: 'Verify calculation for X Way (Pulse + Twin) service',
        servicePlan: XWayServices.PulseTwin,
        distanceUnits: DistanceUnits.IMPERIAL,
        roadLenght: faker.number.int({ min: 200, max: 600 }),
        numberOfIntersections: faker.number.int({ min: 200, max: 600 })
      },
      {
        testCaseTitle:
          'Verify calculation for X Way (Pulse + Twin + Neural) service',
        servicePlan: XWayServices.PulseTwinNeural,
        distanceUnits: DistanceUnits.METRIC,
        roadLenght: faker.number.int({ min: 350, max: 750 }),
        numberOfIntersections: faker.number.int({ min: 350, max: 750 })
      }
    ]

    initialCalculationsTestData.forEach(
      ({
        testCaseTitle,
        servicePlan,
        distanceUnits,
        roadLenght,
        numberOfIntersections
      }) => {
        test(`${testCaseTitle} @SaaSCalculations`, async ({
          calculatorPage
        }) => {
          await test.step('Select maximum Road Lenght and Number of Intersections from sliders', async () => {
            await calculatorPage.actions.setRoadLenght(
              roadLenght!,
              distanceUnits!
            )
            await calculatorPage.actions.setNumberOfSignalizedIntersections(
              numberOfIntersections!
            )
          })

          await test.step(`Choose a service from the 'Select a Service' dropdown`, async () =>
            calculatorPage.actions.selectService(servicePlan))

          await test.step('Verify the calculation is correct', async () =>
            await calculatorPage.expectations.verifySaaSPriceDependOfParameters(
              roadLenght!,
              numberOfIntersections!,
              servicePlan,
              distanceUnits!
            ))
        })
      }
    )
  })
})
