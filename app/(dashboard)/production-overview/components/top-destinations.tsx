import CustomLabelBarChart from "@/components/charts/shadcn/bar-chart/custom-label-bar-chart";

const coDestSumChartConfig = {
  quantity: {
    label: `Qty (T) ${" "}`,
    color: "hsl(var(--chart-6))",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

const cuDestSumChartConfig = {
  quantity: {
    label: `Qty (T) ${" "}`,
    color: "hsl(var(--chart-5))",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

export default function TopDestinations({
  selectedYear,
  coDestSum,
  cuDestSum,
}: any) {
  const year = selectedYear;
  const maxValue = Math.max(
    ...coDestSum.map((item: any) => item.quantity),
    ...cuDestSum.map((item: any) => item.quantity),
  );

  const coDestData = coDestSum.map((item: any) => {
    return {
      ...item,
      quantity: item.quantity.toFixed(1),
    };
  });

  const cuDestData = cuDestSum.map((item: any) => {
    return {
      ...item,
      quantity: item.quantity.toFixed(1),
    };
  });

  return (
    <section className="grid items-start gap-2 xl:col-span-2">
      <div className="grid gap-4 lg:grid-cols-2">
        <CustomLabelBarChart
          title={`Top Destinations of Cobalt Production in ${year}`}
          description="Quantity in Tonnes"
          config={coDestSumChartConfig}
          chartData={coDestData}
          yAxisDataKey="short_destination"
          xAxisDataKey="quantity"
          maxValue={maxValue}
          className="h-[400px]"
        />

        <CustomLabelBarChart
          title={`Top Destinations of Copper Production in ${year}`}
          description="Quantity in Tonnes"
          config={cuDestSumChartConfig}
          chartData={cuDestData}
          yAxisDataKey="short_destination"
          xAxisDataKey="quantity"
          maxValue={maxValue}
          className="h-[400px]"
        />
      </div>
    </section>
  );
}
