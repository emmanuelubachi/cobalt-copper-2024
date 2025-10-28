import CustomLabelBarChart from '@/components/charts/shadcn/bar-chart/custom-label-bar-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { percentageFormatter, percentageFormatter2 } from '@/lib/utils'

const coDestSumChartConfig = {
  quantity: {
    label: `Qty ${' '}`,
    color: 'hsl(var(--chart-6))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
}

const cuDestSumChartConfig = {
  quantity: {
    label: `Qty ${' '}`,
    color: 'hsl(var(--chart-5))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
}

const coDestSumShareChartConfig = {
  quantity_share: {
    label: `Share ${' '}`,
    color: 'hsl(var(--chart-6))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
}

const cuDestSumShareChartConfig = {
  quantity_share: {
    label: `Share ${' '}`,
    color: 'hsl(var(--chart-5))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
}

export default function TopDestinations({
  selectedYear,
  coDestSum,
  cuDestSum,
  coDestSumShare,
  cuDestSumShare,
}: any) {
  const year = selectedYear
  const maxValue = Math.max(
    ...coDestSum.map((item: any) => item.quantity),
    ...cuDestSum.map((item: any) => item.quantity)
  )

  const maxValueShare = Math.max(
    ...coDestSumShare.map((item: any) => item.quantity_share),
    ...cuDestSumShare.map((item: any) => item.quantity_share)
  )

  const coDestData = coDestSum.map((item: any) => {
    return {
      ...item,
      quantity: item.quantity.toFixed(1),
    }
  })

  const cuDestData = cuDestSum.map((item: any) => {
    return {
      ...item,
      quantity: item.quantity.toFixed(1),
    }
  })

  const coDestDataShare = coDestSumShare.map((item: any) => {
    console.log(item)
    return {
      ...item,
      quantity_share: item.quantity_share.toFixed(1),
    }
  })

  const cuDestDataShare = cuDestSumShare.map((item: any) => {
    return {
      ...item,
      quantity_share: item.quantity_share.toFixed(2),
    }
  })

  return (
    <section className="grid items-start gap-2 xl:col-span-2">
      <Tabs defaultValue="quantity">
        <TabsList className="rounded-md bg-muted">
          <TabsTrigger
            value="quantity"
            className="__button_pressed rounded-md bg-muted text-sm text-foreground/70 ring-neutral-200 data-[state=active]:font-semibold"
          >
            Quantity
          </TabsTrigger>
          <TabsTrigger
            value="share"
            className="__button_pressed rounded-md bg-muted text-sm text-foreground/70 ring-neutral-200 data-[state=active]:font-semibold"
          >
            Share
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quantity">
          <div className="grid gap-4 lg:grid-cols-2">
            <CustomLabelBarChart
              title={`Top Destinations of Cobalt Production in ${year}`}
              description="Quantity in Tonnes"
              config={coDestSumChartConfig}
              chartData={coDestData}
              yAxisDataKey="short_destination"
              xAxisDataKey="quantity"
              maxValue={maxValue}
              className="h-[416px]"
            />
            <CustomLabelBarChart
              title={`Top Destinations of Copper Production in ${year}`}
              description="Quantity in Tonnes"
              config={cuDestSumChartConfig}
              chartData={cuDestData}
              yAxisDataKey="short_destination"
              xAxisDataKey="quantity"
              maxValue={maxValue}
              className="h-[416px]"
            />
          </div>
        </TabsContent>
        <TabsContent value="share">
          <div className="grid gap-4 lg:grid-cols-2">
            <CustomLabelBarChart
              title={`Share of Top Destinations of Cobalt Production in ${year}`}
              description="Share in %"
              config={coDestSumShareChartConfig}
              chartData={coDestDataShare}
              yAxisDataKey="short_destination"
              xAxisDataKey="quantity_share"
              maxValue={100}
              className="h-[416px]"
              formatXAxis={percentageFormatter}
              formatTooltip={percentageFormatter2}
            />
            <CustomLabelBarChart
              title={`Share of Top Destinations of Copper Production in ${year}`}
              description="Share in %"
              config={cuDestSumShareChartConfig}
              chartData={cuDestDataShare}
              yAxisDataKey="short_destination"
              xAxisDataKey="quantity_share"
              maxValue={100}
              className="h-[416px]"
              formatXAxis={percentageFormatter}
              formatTooltip={percentageFormatter2}
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
