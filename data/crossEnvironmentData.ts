import { testData } from './environmentData/testData'
import { CrossEnvData } from './types/CrossEnvData'

type TestData = CrossEnvData

const getData = (): TestData => {
  const getEnvData = () => {
    switch (process.env.ENV) {
      case 'TEST':
        return testData
      default:
        return testData
    }
  }
  const envData = getEnvData()

  return {
    ...envData
  }
}

export const data = getData()
