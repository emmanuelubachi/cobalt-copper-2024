import { Card } from "@/components/ui/card";
import { LegendAreaChart } from "@/components/charts/shadcn/area-chart/legend-area-chart";

export const exportTrendChartConfig = {
  Cobalt: {
    label: "CO",
    color: "hsl(var(--chart-6))",
  },
  Copper: {
    label: "CU",
    color: "hsl(var(--chart-5))",
  },
};

export default function ExportTrend({
  exportQuantityData,
  exportTransactionData,
}: any) {
  return (
    <section className="space-y-4 xl:mt-0">
      <div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <LegendAreaChart
            title="Exports Trend"
            description="Annual Quantity of Exported Products (tonnes)."
            config={exportTrendChartConfig}
            chartData={exportQuantityData}
            xAxisDataKey="date"
            firstDataKey="Cobalt"
            secondDataKey="Copper"
          />

          <LegendAreaChart
            title="  "
            description="Annual Transaction of Exported Products (USD)."
            config={exportTrendChartConfig}
            chartData={exportTransactionData}
            xAxisDataKey="date"
            firstDataKey="Cobalt"
            secondDataKey="Copper"
          />
        </div>
      </div>
    </section>
  );
}
