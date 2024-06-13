import { ServicePlan } from '../../pages/types/ServicesPlan'
import { SubTypeServiceRange } from '../../pages/types/ServicesSubTypeRange'
import { DistanceUnits } from '../../pages/types/enums/DistanceUnits'
import {
  XWayServices,
  XWayServicesSubType
} from '../../pages/types/enums/XWayServices'

const getWeightLenght = () => 0.01
const getWeightJunctions = () => 0.02
const getXWUref = () => 5.625
const getMaxNumberOfInterSections = () => 1000
const conversionMilesToKm = () => 1.6

const getMaxRoadLenght = (distanceUnit: DistanceUnits) =>
  distanceUnit === DistanceUnits.IMPERIAL ? 621 : 1000

const getSubTypeServiceRange: () => SubTypeServiceRange[] = () => {
  return [
    { min: 0, max: 28, subTypeLabel: XWayServicesSubType.Starter },
    { min: 29, max: 56, subTypeLabel: XWayServicesSubType.Standard },
    { min: 57, max: 1000, subTypeLabel: XWayServicesSubType.Pro }
  ]
}

const getXWayPlans: () => ServicePlan[] = () => {
  return [
    {
      extendedName: `${XWayServices.Pulse} ${XWayServicesSubType.Starter}`,
      flatRate: 980,
      unitRate: 70,
      unitsIncluded: 14
    },
    {
      extendedName: `${XWayServices.Pulse} ${XWayServicesSubType.Standard}`,
      flatRate: 1430,
      unitRate: 65,
      unitsIncluded: 22
    },
    {
      extendedName: `${XWayServices.Pulse} ${XWayServicesSubType.Pro}`,
      flatRate: 3000,
      unitRate: 60,
      unitsIncluded: 50
    },
    {
      extendedName: `${XWayServices.PulseTwin} ${XWayServicesSubType.Starter}`,
      flatRate: 1260,
      unitRate: 90,
      unitsIncluded: 14
    },
    {
      extendedName: `${XWayServices.PulseTwin} ${XWayServicesSubType.Standard}`,
      flatRate: 1760,
      unitRate: 80,
      unitsIncluded: 22
    },
    {
      extendedName: `${XWayServices.PulseTwin} ${XWayServicesSubType.Pro}`,
      flatRate: 3750,
      unitRate: 75,
      unitsIncluded: 50
    },
    {
      extendedName: `${XWayServices.PulseTwinNeural} ${XWayServicesSubType.Starter}`,
      flatRate: 1680,
      unitRate: 120,
      unitsIncluded: 14
    },
    {
      extendedName: `${XWayServices.PulseTwinNeural} ${XWayServicesSubType.Standard}`,
      flatRate: 2530,
      unitRate: 115,
      unitsIncluded: 22
    },
    {
      extendedName: `${XWayServices.PulseTwinNeural} ${XWayServicesSubType.Pro}`,
      flatRate: 5250,
      unitRate: 105,
      unitsIncluded: 50
    }
  ]
}

export const constData = {
  getSubTypeServiceRange,
  getXWayPlans,
  getXWUref,
  getWeightJunctions,
  getWeightLenght,
  getMaxNumberOfInterSections,
  getMaxRoadLenght,
  conversionMilesToKm
}
