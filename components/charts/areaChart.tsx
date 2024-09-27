"use client";
import { AreaChart } from "@tremor/react";
import { currencyFormatter, quantityFormatter } from "@/lib/utils";
import { useState, useEffect } from "react";

// Define the props interface
interface AreaChartHeroProps {
  data: any[];
  valueFormatter?: "currencyFormatter" | "quantityFormatter";
}

export function AreaChartRender({ data, valueFormatter }: AreaChartHeroProps) {
  const [format, setFormat] = useState<((value: any) => string) | undefined>(
    undefined,
  );

  // Use effect to set the formatter
  useEffect(() => {
    if (valueFormatter === "currencyFormatter") {
      setFormat(() => currencyFormatter);
    } else if (valueFormatter === "quantityFormatter") {
      setFormat(() => quantityFormatter);
    } else {
      setFormat(undefined);
    }
  }, [valueFormatter]);

  return (
    <AreaChart
      className="h-96"
      data={data}
      index="date"
      categories={["Copper", "Cobalt"]}
      colors={["amber", "blue"]}
      valueFormatter={format}
      yAxisWidth={60}
      showGradient={false}
      animationDuration={500}
    />
  );
}
