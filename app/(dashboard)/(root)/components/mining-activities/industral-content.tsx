'use client'
import { useState, useEffect } from 'react'

import Map from 'react-map-gl'
import { ArrowUpRight } from 'lucide-react'

import useMapDetailsStore from '@/store/mapDetailsStore'
import useFilterStore from '@/store/filterStore'

import LinkButton from '@/components/m-ui/link-button'

import MultipleBarChart from '@/components/charts/shadcn/bar-chart/multiple-bar-chart'
// import CustomLabelBarChart from '@/components/charts/shadcn/bar-chart/custom-label-bar-chart'

import {
  IndustralProjectDetailsProps,
  // MonthlyProductionData,
  // NewMonthlyProductionData,
} from '@/types/map'
import {
  calculateYearlySums,
  getYearlySummary,
  transformMonthlyData,
  transformNewMonthlyData,
  // transformSortTopDestination,
} from '@/lib/dataProcessing'

import totalProductionData from '@/data/projects/totals_production_quantity_by_projects_&_type.json'
import montlyProductionData from '@/data/map/2023 Industrial Projects Monthly cobalt-copper Production - origin Statistiques M.json'
import newMontlyProductionData from '@/data/projects/projects_monthly_exports.json'

// import cobaltDestinationData from '@/data/map/2023 cobalt production destination - origin situation des.json'
// import cubaltDestinationData from '@/data/map/2023 copper production destination - origin situation des.json'

import { TMonthlyProductionData } from '@/types/map'
import { YearlyExportDataProps, YearlySummaryProps } from '@/types/projects'
import { monthlyProdChartConfig } from '@/constants/chart'

// const coDestChartConfig = {
//   quantity_tons: {
//     label: `Qty (T) ${' '}`,
//     color: 'hsl(var(--chart-6))',
//   },
//   label: {
//     color: 'hsl(var(--background))',
//   },
// }

// const cuDestChartConfig = {
//   quantity_tons: {
//     label: `Qty (T) ${' '}`,
//     color: 'hsl(var(--chart-5))',
//   },
//   label: {
//     color: 'hsl(var(--background))',
//   },
// }

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const SiteMap = ({
  site_latitude,
  site_longitude,
}: {
  site_latitude?: number
  site_longitude?: number
}) => {
  const [viewState, setViewState] = useState({
    longitude: 23.52741376552,
    latitude: -3.050471588628,
    zoom: 15,
  })

  useEffect(() => {
    if (site_latitude && site_longitude) {
      setViewState({
        longitude: site_longitude,
        latitude: site_latitude,
        zoom: 15,
      })
    }
  }, [site_latitude, site_longitude])

  return (
    <div className="relative h-56 w-full sm:h-80">
      <Map
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        maxZoom={16}
        minZoom={14}
        style={{ position: 'absolute' }}
        attributionControl={false}
      ></Map>
    </div>
  )
}

const SiteDetails = ({ data }: { data: IndustralProjectDetailsProps }) => {
  const { closeMapDetails } = useMapDetailsStore()
  const { closeFilter } = useFilterStore()

  const latitude = parseFloat(data.latitude_longitude?.split(',')[0])
  const longitude = parseFloat(data.latitude_longitude?.split(',')[1])

  const [latestYear, setLatestYear] = useState<string>('')
  const [yearlyExportSummary, setYearlyExportSummary] =
    useState<YearlySummaryProps>()
  // const [totalProd, setTotalProd] = useState<YearlySummaryProps[]>([])
  // const [monthlyData, setMonthlyData] = useState<TMonthlyProductionData[]>([])
  const [newMonthlyData, setNewMonthlyData] = useState<
    TMonthlyProductionData[]
  >([])

  // const [coDestinationData, setCoDestinationData] = useState<
  //   TDestinationData[]
  // >([])
  // const [cuDestinationData, setCuDestinationData] = useState<
  //   TDestinationData[]
  // >([])

  useEffect(() => {
    // const fetchTotalProductionData = async () => {
    //   try {
    //     // Filter data based on _project_id
    //     const filtered = totalProductionData.filter(
    //       (row) => row._project_id === data._project_id
    //     )

    //     // Process data
    //     const totalProd = calculateYearlySums(filtered)

    //     setTotalProd(totalProd)
    //   } catch (error) {
    //     console.error(
    //       'Error fetching and processing total industral projects production data:',
    //       error
    //     )
    //   }
    // }

    // const fetchMonthlyData = async () => {
    //   try {
    //     // Filter data based on _project_id
    //     const filtered = montlyProductionData.filter(
    //       (row) => row._project_id === data._project_id
    //     )

    //     // Process data for chart
    //     const MonthlyProductionData = transformMonthlyData(filtered)

    //     setMonthlyData(MonthlyProductionData)
    //   } catch (error) {
    //     console.error(
    //       'Error fetching and processing monthly industral projects production data:',
    //       error
    //     )
    //   }
    // }

    const fetchNewMonthlyData = async () => {
      try {
        type MonthKey =
          | 'Jan'
          | 'Feb'
          | 'Mar'
          | 'Apr'
          | 'May'
          | 'Jun'
          | 'Jul'
          | 'Aug'
          | 'Sep'
          | 'Oct'
          | 'Nov'
          | 'Dec'
        const monthMap: Record<MonthKey, { num: number; full: string }> = {
          Jan: { num: 1, full: 'January' },
          Feb: { num: 2, full: 'February' },
          Mar: { num: 3, full: 'March' },
          Apr: { num: 4, full: 'April' },
          May: { num: 5, full: 'May' },
          Jun: { num: 6, full: 'June' },
          Jul: { num: 7, full: 'July' },
          Aug: { num: 8, full: 'August' },
          Sep: { num: 9, full: 'September' },
          Oct: { num: 10, full: 'October' },
          Nov: { num: 11, full: 'November' },
          Dec: { num: 12, full: 'December' },
        }
        // Filter data based on _project_id
        const projectData = newMontlyProductionData.filter(
          (row) => row._project_id === data._project_id
        )

        // Find latest year for that project
        const latestYear = Math.max(...projectData.map((d) => Number(d.year)))

        // Filter all records in that latest year
        const latestYearData = projectData
          .filter((d) => Number(d.year) === latestYear)
          .sort((a, b) => {
            const monthA = monthMap[a.month as MonthKey]?.num ?? 0
            const monthB = monthMap[b.month as MonthKey]?.num ?? 0
            return monthA - monthB
          })

        // Return clean formatted records
        const filteredMonthlyData: YearlyExportDataProps[] = latestYearData.map(
          ({ year, month, product, quantity }) => ({
            year,
            month: monthMap[month as MonthKey]?.full || month, // convert to full month name
            quantity: quantity,
            product,
          })
        )

        // Process data for chart
        const MonthlyProductionData =
          transformNewMonthlyData(filteredMonthlyData)

        // Annual Export
        const YearlyExport = getYearlySummary(filteredMonthlyData)

        setYearlyExportSummary(YearlyExport)
        setLatestYear(latestYear.toString())
        setNewMonthlyData(MonthlyProductionData)
      } catch (error) {
        console.error(
          'Error fetching and processing monthly industrial projects production data:',
          error
        )
      }
    }

    // const fetchCoDestinationData = async () => {
    //   try {
    //     // Filter data based on short_name
    //     const filtered = cobaltDestinationData.filter(
    //       (row) => row._project_id === data._project_id
    //     )

    //     // Process data for chart - sort for top destinations
    //     const CoDestinationData = transformSortTopDestination(filtered)

    //     setCoDestinationData(CoDestinationData)
    //   } catch (error) {
    //     console.error(
    //       'Error fetching and processing co destination data:',
    //       error
    //     )
    //   }
    // }

    // const fetchCuDestinationData = async () => {
    //   try {
    //     // Filter data based on short_name
    //     const filtered = cubaltDestinationData.filter(
    //       (row) => row._project_id === data._project_id
    //     )

    //     // Process data for chart - sort for top destinations
    //     const CuDestinationData = transformSortTopDestination(filtered)

    //     setCuDestinationData(CuDestinationData)
    //   } catch (error) {
    //     console.error(
    //       'Error fetching and processing cu destination data:',
    //       error
    //     )
    //   }
    // }

    // fetchTotalProductionData()
    // fetchMonthlyData()
    fetchNewMonthlyData()
    // fetchCoDestinationData()
    // fetchCuDestinationData()
  }, [data._project_id])

  return (
    <div className="mx-auto">
      <SiteMap site_latitude={latitude} site_longitude={longitude} />
      <div className={`grid gap-4 p-4 sm:p-6`}>
        <h2 className="text-xl font-medium">{data.Project_name}</h2>

        <div className="mb-4 flex shrink grow flex-col space-y-6 text-sm font-medium text-foreground">
          {/* Geographical Details */}
          <div className="grid gap-2">
            {data.Nationality && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Nationality:{' '}
                  </span>
                  {data.Nationality}
                </p>
              </div>
            )}

            {data.Province && (
              <div>
                <span className="font-medium text-foreground/70">
                  Province:{' '}
                </span>
                {data.Province}
              </div>
            )}

            {data.Geographical_coordinates && (
              <div className="flex items-center gap-1">
                <p>
                  <span className="font-medium text-foreground/70">
                    Geographical Coordinates:{' '}
                  </span>
                  {data.Geographical_coordinates}
                </p>
              </div>
            )}

            {data.Geographical_description_project_description && (
              <div className="">
                <span className="font-medium text-foreground/70">
                  Geographical Description:
                </span>
                <p className="font-medium">
                  {data.Geographical_description_project_description}
                </p>
              </div>
            )}
          </div>

          {/* Mining Details */}
          <div className="grid gap-4">
            {/* {totalProd.length > 0 && (
              <div className="">
                <span className="font-medium text-foreground/70">
                  Annual Production {totalProd.length > 0 && totalProd[0].year}:
                </span>
                <div>
                  <div className="flex gap-4 text-xl font-bold">
                    {totalProd[0].totalCobalt > 0 && (
                      <span className="text-chart6">
                        {totalProd[0].totalCobalt > 0 &&
                          totalProd[0].totalCobalt
                            .toFixed(1)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                            ' tonnes Co'}
                      </span>
                    )}

                    {totalProd[0].totalCopper > 0 && (
                      <span className="text-chart5">
                        {totalProd[0].totalCopper > 0 &&
                          totalProd[0].totalCopper
                            .toFixed(1)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                            ' tonnes Cu'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )} */}

            {yearlyExportSummary && (
              <div className="">
                <span className="font-medium text-foreground/70">
                  Total Export in {yearlyExportSummary.year}:
                </span>
                <div>
                  <div className="flex gap-4 text-xl font-bold">
                    {yearlyExportSummary.totalCobalt > 0 && (
                      <span className="text-chart6">
                        {yearlyExportSummary.totalCobalt > 0 &&
                          yearlyExportSummary.totalCobalt
                            .toFixed(1)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                            ' tonnes Co'}
                      </span>
                    )}

                    {yearlyExportSummary.totalCopper > 0 && (
                      <span className="text-chart5">
                        {yearlyExportSummary.totalCopper > 0 &&
                          yearlyExportSummary.totalCopper
                            .toFixed(1)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                            ' tonnes Cu'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {newMonthlyData.length > 0 && (
              <MultipleBarChart
                title={`Exports of Copper and Cobalt in ${latestYear}`}
                description="Quantity in Tonnes"
                config={monthlyProdChartConfig}
                chartData={newMonthlyData}
                firstDataKey="Cobalt"
                secondDataKey="Copper"
              />
            )}

            {/* {coDestinationData.length > 0 && (
              <CustomLabelBarChart
                title="Top Destinations of Cobalt Production in 2023"
                description="Quantity in Tonnes"
                config={coDestChartConfig}
                chartData={coDestinationData}
                yAxisDataKey="destination"
                xAxisDataKey="quantity_tons"
                className="h-[200px]"
                maxValue={Math.max(
                  ...coDestinationData.map((d) => d.quantity_tons)
                )}
                footNote={
                  <>
                    <div className="leading-none text-muted-foreground">
                      Showing top {coDestinationData.length > 4 ? 5 : ''}{' '}
                      destinations in 2023.
                    </div>
                  </>
                }
              />
            )}

            {cuDestinationData.length > 0 && (
              <CustomLabelBarChart
                title="Top Destinations of Copper Production in 2023"
                description="Quantity in Tonnes"
                config={cuDestChartConfig}
                chartData={cuDestinationData}
                yAxisDataKey="destination"
                xAxisDataKey="quantity_tons"
                className="h-[200px]"
                maxValue={Math.max(
                  ...cuDestinationData.map((d) => d.quantity_tons)
                )}
                footNote={
                  <>
                    <div className="leading-none text-muted-foreground">
                      Showing top {cuDestinationData.length > 4 ? 5 : ''}{' '}
                      destinations in 2023.
                    </div>
                  </>
                }
              />
            )} */}
          </div>

          {/* Mine Details */}
          <div className="grid gap-2">
            {data['Deposit_size_(official_reserves)'] && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Deposit Size:{' '}
                  </span>
                  {data['Deposit_size_(official_reserves)']}
                </p>
              </div>
            )}
            {data.Project_size && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Project Size:{' '}
                  </span>
                  {data.Project_size}
                </p>
              </div>
            )}
            {data.Permit_ID && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Permit ID:{' '}
                  </span>
                  {data.Permit_ID}
                </p>
              </div>
            )}

            {data['Mine_life/permit_validity'] && (
              <div className="">
                <p>
                  <span className="font-medium text-foreground/70">
                    Mine Life/Permit Validity:{' '}
                  </span>
                  {data['Mine_life/permit_validity']}
                </p>
              </div>
            )}

            {data.Mine_type && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Mine Type:{' '}
                  </span>
                  {data.Mine_type}
                </p>
              </div>
            )}

            {data.Ownership && (
              <div className="">
                <p>
                  <span className="font-medium text-foreground/70">
                    Ownership:{' '}
                  </span>
                  {data.Ownership}
                </p>
              </div>
            )}

            {data.Share_allocation && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Share Allocation:{' '}
                  </span>
                  {data.Share_allocation}
                </p>
              </div>
            )}

            {data.Contract_type && (
              <div>
                <p>
                  <span className="font-medium text-foreground/70">
                    Contract Type:{' '}
                  </span>
                  {data.Contract_type}
                </p>
              </div>
            )}
          </div>
        </div>

        {/*Navigate to Project Page */}
        <div>
          <LinkButton
            href={`/projects?project_id=${data._project_id}`}
            variant="default"
            size={'lg'}
            onClick={() => {
              ;(closeFilter(), closeMapDetails())
            }}
          >
            View Project
            <ArrowUpRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

export function IndustrialProjectsContent({
  data,
}: {
  data: IndustralProjectDetailsProps | null
}) {
  if (!data) {
    return <div>No industral projects selected</div>
  }
  const projectData = data
  return <SiteDetails data={projectData} />
}
