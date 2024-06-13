import { DistanceUnits } from '../pages/types/enums/DistanceUnits'
import { XWayServices } from '../pages/types/enums/XWayServices'

import { constData } from './utils/constData'

const subTypeServiceRange = constData.getSubTypeServiceRange()

const calculateTrafficComplexity = (
  roadLenght: number,
  numberOfSignalizedIntersections: number
) => {
  const result = Number(
    (
      roadLenght * constData.getWeightLenght() +
      numberOfSignalizedIntersections * constData.getWeightJunctions()
    ).toFixed(2)
  )

  return result
}

const calculateXWUFactor = (trafficComplexity: number) => {
  const result = Math.ceil(constData.getXWUref() * trafficComplexity)

  return result
}

const defineExtendedName = (xWayService: XWayServices, xwuFactor: number) => {
  for (const unitsIncluded of subTypeServiceRange) {
    if (xwuFactor >= unitsIncluded.min && xwuFactor <= unitsIncluded.max) {
      return `${xWayService} ${unitsIncluded.subTypeLabel}`
    }

    const lastRange = subTypeServiceRange.slice(-1)[0]
    if (xwuFactor >= lastRange.max) {
      return `${xWayService} ${lastRange.subTypeLabel}`
    }
  }
  return 'Invalid XMU Factor'
}

const calculateSaaSPrice = async (
  roadLenght: number,
  numberOfSignalizedIntersections: number,
  xWayService: XWayServices,
  distanceUnits: DistanceUnits
) => {
  const trafficComplexity = calculateTrafficComplexity(
    roadLenght,
    numberOfSignalizedIntersections
  )
  const xwuFactor = calculateXWUFactor(trafficComplexity)

  const definedExtendedName = defineExtendedName(xWayService, xwuFactor)

  const servicePlan = constData
    .getXWayPlans()
    .find(plan => plan.extendedName === definedExtendedName)!

  const saasPrice =
    xwuFactor > servicePlan.unitsIncluded
      ? servicePlan.flatRate +
        (xwuFactor - servicePlan.unitsIncluded) * servicePlan.unitRate
      : servicePlan.flatRate

  return saasPrice
}

export const calculatorPageFactory = {
  calculateSaaSPrice
}
