"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import useDeviceType from "@/hooks/useDeviceType";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { numberFormatter, quantityFormatter } from "@/lib/utils";

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        // fill="#666"
        fontSize={8}
        transform="rotate(-45)" // Rotate the text
      >
        {payload.value.slice(0, 6)}
      </text>
    </g>
  );
};

type InteractiveBarChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: {
    _project_id: string;
    totalCobalt: number;
    totalCopper: number;
  }[];
  firstDataKey: string;
  secondDataKey: string;
  footNote?: React.ReactNode;
};

type SInteractiveBarChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: {
    exporter: string;
    quantity: number;
  }[];
  xdataKey: string;
  ydataKey: string;
  footNote?: React.ReactNode;
};

export function InteractiveBarChart({ ...props }: InteractiveBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("totalCopper");

  const chartData = props.chartData;

  const total = React.useMemo(
    () => ({
      totalCobalt: chartData
        .reduce((acc, curr) => acc + curr.totalCobalt, 0)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      totalCopper: chartData
        .reduce((acc, curr) => acc + curr.totalCopper, 0)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    }),
    [chartData],
  );

  return (
    <Card className="__card">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 md:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
        <div className="flex">
          {["totalCobalt", "totalCopper"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_project_id"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => value.slice(0, 7)}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SingleInteractiveBarChart({
  ...props
}: SInteractiveBarChartProps) {
  const chartConfig = props.config satisfies ChartConfig;
  const chartData = props.chartData;
  const { isMobile } = useDeviceType();

  return (
    <Card className="__card">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b md:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 8,
              right: 8,
              top: 8,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${quantityFormatter(value)}\u00a0t`}
            />
            <XAxis
              dataKey={props.xdataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              minTickGap={0}
              tick={isMobile ? <> </> : <CustomizedAxisTick />}
              tickFormatter={(value) => value.slice(0, 1)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => value.slice(0)}
                  formatter={(value, name) => (
                    <>
                      <div className="flex min-w-[130px] items-center gap-1 text-xs text-muted-foreground">
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {quantityFormatter(parseFloat(value as string))}
                        </div>
                      </div>
                    </>
                  )}
                />
              }
            />
            <Bar
              dataKey={props.ydataKey}
              fill={`var(--color-${props.ydataKey})`}
            >
              <LabelList
                dataKey={props.ydataKey}
                position="top"
                className="truncate fill-foreground/80 text-2xs"
                formatter={(value: number) => {
                  if (props.chartData.length < 35) {
                    return numberFormatter(value);
                  } else if (value > 45000) {
                    return numberFormatter(value);
                  }
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
