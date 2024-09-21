"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { shareDataByCountryProps } from "@/types/overview";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
// ['Australia',
//   'China',
//   'China/Canada',
//   'DR Congo',
//   'India',
//   'Kazakhstan',
//   'Others',
//   'South Africa',
//   'Switzerland']
const chartConfig = {
  country: {
    label: "Country",
  },
  Australia: {
    label: "Australia",
    color: "hsl(var(--chart-1))",
  },
  China: {
    label: "China",
    color: "hsl(var(--chart-2))",
  },
  "China/Canada": {
    label: "China/Canada",
    color: "hsl(var(--chart-3))",
  },
  "DR Congo": {
    label: "DR Congo",
    color: "hsl(var(--chart-4))",
  },
  India: {
    label: "India",
    color: "hsl(var(--chart-5))",
  },
  Kazakhstan: {
    label: "Kazakhstan",
    color: "hsl(var(--chart-6))",
  },
  Others: {
    label: "Others",
    color: "hsl(var(--chart-7))",
  },
  "South Africa": {
    label: "South Africa",
    color: "hsl(var(--chart-6))",
  },
  Switzerland: {
    label: "Switzerland",
    color: "hsl(var(--chart-9))",
  },
} satisfies ChartConfig;

export default function Component({
  data,
  title,
  description,
}: {
  data: shareDataByCountryProps;
  title?: string;
  description?: string;
}) {
  return (
    <Card className="flex flex-col border-none shadow-none dark:bg-neutral-900/30">
      {title && (
        <CardHeader className="">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      {description && (
        <CardDescription className="px-4 py-4">{description}</CardDescription>
      )}

      <div className="grid grid-cols-2">
        <CardContent className="my-auto flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[220px]"
          >
            <PieChart
              margin={{
                right: 8,
                left: 8,
              }}
            >
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={data}
                dataKey="share"
                nameKey="country"
                innerRadius={60}
                label
                labelLine
              />
            </PieChart>
          </ChartContainer>
        </CardContent>

        <div className="flex flex-col gap-2 p-6">
          <h6 className="text-center text-h6 font-semibold">Nationality</h6>
          {data.map((item) => (
            <div
              key={item.country}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: `hsl(${item.fill})` }}
                />
                <p className="text-sm">{item.country}</p>
              </div>
              <p className="text-sm">{item.share.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function DoubleDonutChart() {
  return (
    <Card className="flex flex-col border-none shadow-none dark:bg-neutral-900/30">
      <CardHeader className="">
        <CardTitle>Shares of mining production by project groups</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <CardDescription className="text-center">Cobalt</CardDescription>
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[230px]"
        >
          {/* <PieChart
            margin={{
              right: 8,
              left: 8,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              label
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart> */}
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>

        <CardDescription className="text-center">Copper</CardDescription>
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[230px]"
        >
          {/* <PieChart
            margin={{
              right: 8,
              left: 8,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              label
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart> */}
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
