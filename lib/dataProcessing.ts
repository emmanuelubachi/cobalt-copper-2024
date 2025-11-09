import {
  MonthlyProductionData,
  TMonthlyProductionData,
  DestinationData,
  TDestinationData,
  NewMonthlyProductionData,
} from '@/types/map'
import {
  DestinationSummary,
  DetailedYearlySummary,
  ProjectSummary,
  YearlyExportDataProps,
  YearlySummaryProps,
} from '@/types/projects'

/**
 * Transforms the given monthly production data into a format that is easier to
 * consume for the charts and tables.
 *
 * @param data - The monthly production data.
 * @returns An array of objects with the month and Cobalt and Copper quantities.
 */
export function transformMonthlyData(
  data: MonthlyProductionData[]
): TMonthlyProductionData[] {
  const result: TMonthlyProductionData[] = []
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Initialize result array with months
  months.forEach((month) => {
    result.push({ month, Cobalt: 0, Copper: 0 })
  })

  // Process each entry in the data
  data.forEach((entry) => {
    const { month, quantity_tons, product } = entry
    const targetMonth = result.find((m) => m.month === month)

    if (targetMonth) {
      if (product === 'Cobalt' || product === 'Copper') {
        targetMonth[product] += parseFloat(quantity_tons)
      }
    }
  })

  // Remove months without any data for Cobalt or Copper
  return result.filter((monthData) => monthData.Cobalt || monthData.Copper)
}

/**
 * Transforms the given monthly production data into a format that is easier to
 * consume for the charts and tables.
 *
 * @param data - The monthly production data.
 * @returns An array of objects with the month and Cobalt and Copper quantities.
 */
export function transformNewMonthlyData(
  data: NewMonthlyProductionData[]
): TMonthlyProductionData[] {
  const result: TMonthlyProductionData[] = []
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Initialize result array with months
  months.forEach((month) => {
    result.push({ month, Cobalt: 0, Copper: 0 })
  })

  // Process each entry in the data
  data.forEach((entry) => {
    const { month, quantity, product } = entry
    const targetMonth = result.find((m) => m.month === month)

    if (targetMonth) {
      if (product === 'Cobalt' || product === 'Copper') {
        targetMonth[product] += parseFloat(quantity)
      }
    }
  })

  // Remove months without any data for Cobalt or Copper
  return result.filter((monthData) => monthData.Cobalt || monthData.Copper)
}

interface AggregatedData {
  [key: string]: {
    destination: string
    quantity_tons: number
  }
}

export function transformDestinationData(
  data: DestinationData[]
): TDestinationData[] {
  // Step 1: Aggregate quantities based on _project_id and destination
  const aggregatedData: AggregatedData = data.reduce(
    (acc: AggregatedData, entry) => {
      const key = `${entry._project_id}_${entry.destination}`
      if (!acc[key]) {
        acc[key] = {
          destination: entry.destination,
          quantity_tons: 0,
        }
      }
      acc[key].quantity_tons += parseFloat(entry.quantity_tons)
      return acc
    },
    {}
  )

  // Step 2: Transform aggregated data
  const transformedData = Object.values(aggregatedData).map((entry) => {
    const roundedWeight = entry.quantity_tons.toFixed(1)
    return {
      destination: entry.destination,
      quantity_tons: parseFloat(
        roundedWeight.toLocaleString().replace(/,/g, '')
      ),
      label: `${roundedWeight}T`,
    }
  })

  // Step 3: Sort the transformed data in descending order based on quantity_tons
  return transformedData.sort((a, b) => b.quantity_tons - a.quantity_tons)
}

export function transformSortTopDestination(
  data: DestinationData[]
): TDestinationData[] {
  // Step 1: Aggregate quantities based on _project_id and destination
  const aggregatedData: AggregatedData = data.reduce(
    (acc: AggregatedData, entry) => {
      const key = `${entry._project_id}_${entry.destination}`
      if (!acc[key]) {
        acc[key] = {
          destination: entry.destination,
          quantity_tons: 0,
        }
      }
      acc[key].quantity_tons += parseFloat(entry.quantity_tons)
      return acc
    },
    {}
  )

  // Step 2: Transform aggregated data
  const transformedData = Object.values(aggregatedData).map((entry) => {
    const roundedWeight = entry.quantity_tons.toFixed(1)
    return {
      destination: entry.destination,
      quantity_tons: parseFloat(
        roundedWeight.toLocaleString().replace(/,/g, '')
      ),
      label: `${roundedWeight}T`,
    }
  })

  // Step 3: Sort the transformed data in descending order based on quantity_tons
  const sortedData = transformedData.sort(
    (a, b) => b.quantity_tons - a.quantity_tons
  )

  // Step 4: Return the top 5 destinations
  return sortedData.slice(0, 5)
}

type MiningData = {
  short_name: string
  type: string
  copper: string
  cobalt: string
  year: string
  _project_id: string
  [key: string]: any // To handle any additional properties
}

export function calculateYearlySums(data: MiningData[]): YearlySummaryProps[] {
  const result: { [year: string]: YearlySummaryProps } = {}

  data.forEach((item) => {
    const year = item.year
    const copper = parseFloat(item.copper)
    const cobalt = parseFloat(item.cobalt)

    if (!result[year]) {
      result[year] = {
        year: year,
        totalCopper: 0,
        totalCobalt: 0,
      }
    }

    result[year].totalCopper += copper
    result[year].totalCobalt += cobalt
  })

  return Object.values(result)
}

// Function to compute the yearly summary
export function getYearlySummary(
  data: YearlyExportDataProps[]
): YearlySummaryProps {
  // Ensure filtered is not empty
  if (!data || data.length === 0) {
    return { year: '', totalCopper: 0, totalCobalt: 0 }
  }

  const year = data[0].year // all entries share the same year
  let totalCopper = 0
  let totalCobalt = 0

  for (const item of data) {
    const qty = Number(item.quantity) || 0

    if (item.product.toLowerCase() === 'copper') totalCopper += qty
    if (item.product.toLowerCase() === 'cobalt') totalCobalt += qty
  }

  return { year, totalCopper, totalCobalt }
}

export function calculateDetailedYearlySums(
  data: MiningData[]
): DetailedYearlySummary[] {
  const result: { [year: string]: DetailedYearlySummary } = {}

  data.forEach((item) => {
    const year = item.year
    const copper = parseFloat(item.copper)
    const cobalt = parseFloat(item.cobalt)
    const type = item.type

    if (!result[year]) {
      result[year] = {
        year: year,
        totalCopperExport: 0,
        totalCopperLocal: 0,
        totalCobaltExport: 0,
        totalCobaltLocal: 0,
      }
    }

    if (type === 'export') {
      result[year].totalCopperExport += copper
      result[year].totalCobaltExport += cobalt
    } else if (type === 'local') {
      result[year].totalCopperLocal += copper
      result[year].totalCobaltLocal += cobalt
    }
  })

  return Object.values(result)
}

export function calculateProjectSums(data: MiningData[]): ProjectSummary[] {
  const result: {
    [projectId: string]: { totalCopper: number; totalCobalt: number }
  } = {}

  data.forEach((item) => {
    const projectId = item._project_id
    const copper = parseFloat(item.copper)
    const cobalt = parseFloat(item.cobalt)

    if (!result[projectId]) {
      result[projectId] = {
        totalCopper: 0,
        totalCobalt: 0,
      }
    }

    result[projectId].totalCopper += copper
    result[projectId].totalCobalt += cobalt
  })

  return Object.keys(result).map((projectId) => ({
    _project_id: projectId,
    totalCopper: result[projectId].totalCopper,
    totalCobalt: result[projectId].totalCobalt,
  }))
}

interface ShipmentData {
  _project_id: string
  destination: string
  quantity_tons: string
}

export function calculateDestinationSums(
  data: ShipmentData[],
  projectIdFilter?: string
): DestinationSummary[] {
  const result: { [destination: string]: number } = {}

  data.forEach((item) => {
    if (!projectIdFilter || item._project_id === projectIdFilter) {
      const destination = item.destination
      const quantityTons = parseFloat(item.quantity_tons)

      if (!result[destination]) {
        result[destination] = 0
      }

      result[destination] += quantityTons
    }
  })

  return Object.keys(result)
    .map((destination) => ({
      destination: destination,
      totalQuantityTons: result[destination].toFixed(1), // Keeping the precision
    }))
    .sort(
      (a, b) =>
        parseFloat(b.totalQuantityTons.replace(/,/g, '')) -
        parseFloat(a.totalQuantityTons.replace(/,/g, ''))
    )
}

import { OverviewDestinationSummary } from '@/types/overview'
export function summarizeDestinations(
  data: OverviewDestinationSummary[],
  sortBy?: 'quantity' | 'transaction'
): OverviewDestinationSummary[] {
  const summaryMap = new Map<string, OverviewDestinationSummary>()

  data.forEach((item) => {
    const existing = summaryMap.get(item.short_destination)

    if (existing) {
      existing.quantity += item.quantity
      existing.transaction += item.transaction
    } else {
      summaryMap.set(item.short_destination, { ...item })
    }
  })

  let summarizedData = Array.from(summaryMap.values())

  if (sortBy) {
    summarizedData.sort((a, b) => b[sortBy] - a[sortBy])
  } else {
    summarizedData.sort((a, b) => b.quantity - a.quantity)
  }

  return summarizedData
}

import { InputData, TransformedData } from '@/types/overview'
export function transformTrendData(data: InputData): TransformedData {
  const result: TransformedData = []

  data.forEach((item) => {
    const { date, quantity, transaction, product } = item
    const existingEntry = result.find((entry) => entry.date === date)

    // Determine the key (Cobalt or Copper) based on the product
    const key = product as keyof Omit<TransformedData[0], 'date'>

    // Get the value from either quantity or transaction
    const value = quantity
      ? parseFloat(quantity)
      : parseFloat(transaction || '0')

    if (existingEntry) {
      // Add the value to the existing entry
      existingEntry[key] = value
    } else {
      // Create a new entry
      result.push({
        date,
        [key]: value,
      })
    }
  })

  return result
}

interface ProductData {
  product: string
  concentration: string
  quantity: number
  transaction: number
}

interface ProductSummary {
  product: string
  totalQuantity: number
  totalTransaction: number
}

/**
 * This function takes an array of ProductData objects and returns an array of
 * ProductSummary objects, which contain the total quantity and total transaction
 * for each product in the input array.
 *
 * @param {ProductData[]} data - The array of ProductData objects to be summarized.
 * @returns {ProductSummary[]} - An array of ProductSummary objects, each containing
 * the total quantity and total transaction for a product.
 */
export function calculateProductSummary(data: ProductData[]): ProductSummary[] {
  const summaryMap: {
    [key: string]: { totalQuantity: number; totalTransaction: number }
  } = {}

  data.forEach((item) => {
    const { product, quantity, transaction } = item

    if (!summaryMap[product]) {
      summaryMap[product] = { totalQuantity: 0, totalTransaction: 0 }
    }

    summaryMap[product].totalQuantity += quantity
    summaryMap[product].totalTransaction += transaction
  })

  return Object.keys(summaryMap).map((product) => ({
    product,
    totalQuantity: summaryMap[product].totalQuantity,
    totalTransaction: summaryMap[product].totalTransaction,
  }))
}

interface ProdDesInputData {
  destination: string
  product: string
  quantity: number
  transaction: number
}

interface ProdDesTransformedData {
  destination: string
  cobalt: number
  copper: number
}

/**
 * This function takes an array of InputData objects and returns an array of
 * TransformedData objects, which contain the total quantity of cobalt and copper
 * for each destination in the input array.
 *
 * @param {ProdDesInputData[]} data - The array of InputData objects to be transformed.
 * @returns {ProdDesTransformedData[]} - An array of TransformedData objects, each containing
 * the total quantity of cobalt and copper for a destination.
 */
export function transformProdDesData(
  data: ProdDesInputData[]
): ProdDesTransformedData[] {
  const resultMap: { [key: string]: { cobalt: number; copper: number } } = {}

  data.forEach((item) => {
    const { destination, product, quantity } = item

    if (!resultMap[destination]) {
      resultMap[destination] = { cobalt: 0, copper: 0 }
    }

    if (product.toLowerCase() === 'cobalt') {
      resultMap[destination].cobalt += quantity
    } else if (product.toLowerCase() === 'copper') {
      resultMap[destination].copper += quantity
    }
  })

  const transformedData = Object.keys(resultMap).map((destination) => ({
    destination,
    cobalt: resultMap[destination].cobalt,
    copper: resultMap[destination].copper,
  }))

  // Sort the transformed data by the total value (cobalt + copper) in descending order
  return transformedData.sort(
    (a, b) => b.cobalt + b.copper - (a.cobalt + a.copper)
  )
}

type MonthlyData = {
  product: string
  month: string
  quantity: number
}

/**
 * Sorts an array of MonthlyData objects by the month in ascending order.
 * The sort order is based on the monthOrder array, which is a list of
 * all 12 months in a year, in order.
 *
 * @param {MonthlyData[]} data - The array of MonthlyData objects to be sorted.
 * @returns {MonthlyData[]} - The sorted array of MonthlyData objects.
 */
export function sortDataByMonth(data: MonthlyData[]): MonthlyData[] {
  const monthOrder = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return data.sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  )
}

type ProductionData = {
  product: string
  concentration: string
  quantity: number
  transaction: number
}

type GroupedData = {
  product: string
  concentration: string
  quantity: number
  transaction: number
}

export function groupByProductAndConcentration(
  data: ProductionData[]
): GroupedData[] {
  const groupedMap = new Map<string, GroupedData>()

  data.forEach((item) => {
    const key = `${item.product}-${item.concentration}`

    if (groupedMap.has(key)) {
      const existing = groupedMap.get(key)!
      existing.quantity += item.quantity
      existing.transaction += item.transaction
    } else {
      groupedMap.set(key, {
        product: item.product,
        concentration: item.concentration,
        quantity: item.quantity,
        transaction: item.transaction,
      })
    }
  })

  return Array.from(groupedMap.values())
}
