"use client";
import { ReactNode } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import {
  cn,
  currencyFormatter,
  quantityFormatter,
  quantityFormatterT,
} from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type TreeMapChartProps = {
  title: string;
  description: string;
  config: ChartConfig;
  chartData: any;
  footNote?: ReactNode;
  classname?: string;
  namekey?: string;
  sizekey?: string;
};

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
];

const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  name,
  value,
}: any) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        className="stroke-muted dark:bg-neutral-900/10"
        style={{
          fill:
            depth < 2
              ? COLORS[Math.floor((index / root.children.length) * 6)]
              : "#ffffff00",
          strokeWidth: 0.5 / (depth + 1e-10),
          strokeOpacity: 0.5 / (depth + 1e-10),
          border: 0,
          background: "transparent",
        }}
        rx={6} // This adds the border-radius to the corners
        ry={6} // This adds the border-radius to the corners
      />
      {depth === 1 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#000"
            fontSize={14}
            color="#000"
            className="stroke-none font-medium"
          >
            {quantityFormatter(value)}
            {/* {name} */}
          </text>
        </>
      )}
    </g>
  );
};

// // Custom Legend Component
// const CustomLegend = ({ payload }: any) => {
//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
//       {payload.map((entry, index) => (
//         <div key={`item-${index}`} style={{ marginRight: 20 }}>
//           <span
//             style={{
//               display: "inline-block",
//               width: 12,
//               height: 12,
//               backgroundColor: entry.color,
//               marginRight: 6,
//             }}
//           ></span>
//           {entry.name}
//         </div>
//       ))}
//     </div>
//   );
// };

const TooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="treemap-custom-tooltip rounded-md bg-white stroke-none p-2 dark:bg-black">
        {/* <p className="text-foreground/70">{`${payload[0].payload.root.name}`}</p> */}
        <p className="text-foreground/70">{`Product`}</p>

        <p className="font-bold">{`${payload[0].name}`}</p>
        <p>
          Quantity:{" "}
          <span className="font-bold">
            {quantityFormatterT(payload[0].value)}
          </span>
        </p>
        <p>
          Transaction:{" "}
          <span className="font-bold">
            {`${currencyFormatter(payload[0].payload.transaction)}`}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default function TreeMapChart({ ...props }: TreeMapChartProps) {
  const chartConfig = props.config satisfies ChartConfig;

  return (
    <Card className="__card">
      <CardHeader className="border-b px-4">
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center px-4 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className={cn(
            "aspect-auto h-[420px] w-[98%] overflow-hidden rounded-lg",
            props.classname,
          )}
        >
          <ResponsiveContainer>
            <Treemap
              nameKey={props.namekey || "name"}
              data={props.chartData}
              dataKey={props.sizekey || "size"}
              animationDuration={300}
              className="stroke-foreground"
              border-radius="10px"
              content={<CustomizedContent />}
            >
              <Tooltip content={<TooltipContent />} />
            </Treemap>
          </ResponsiveContainer>
        </ChartContainer>
        {/* <CustomLegend payload={props.chartData} /> */}
      </CardContent>
      {props.footNote && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {props.footNote}
        </CardFooter>
      )}
    </Card>
  );
}
