"use client";
import React, { useState } from "react";
import ProductToggle from "@/components/product-toggle";
import SankeyChart from "@/components/charts/echarts/sankey";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import YearToggle from "@/components/year-toggle";
import useDeviceType from "@/hooks/useDeviceType";
import { ProjectInfo } from "@/types";

function shortenText(text: string): string {
  return text.split(" ")[0];
}

/**
 * @function ExportFlow
 * @description A component to display export flow data with Sankey chart.
 * @param {object} props Component props.
 * @param {any[]} props.data The export flow data.
 * @param {any[]} props.data2 The export flow data for importers.
 * @param {boolean} [props.hasYear=true] Whether the component should display year selection or not.
 * @param {{mobile: number; others: number}} [props.chartHeight={mobile: 1000, others: 1400}] The height of the Sankey chart.
 * @returns {ReactElement} The ExportFlow component.
 */
export default function ExportFlow({
  projectInfo,
  data,
  data2,
  hasYear = true,
  chartHeight = { mobile: 1000, others: 1400 },
}: {
  projectInfo?: ProjectInfo;
  data: any[];
  data2: any[];
  hasYear?: boolean;
  chartHeight?: { mobile: number; others: number };
}) {
  const { isMobile, isTablet } = useDeviceType();
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedProduct, setSelectedProduct] = useState<string>("Cobalt");

  const years = ["2022", "2023", "2024"];

  hasYear
    ? (data = data.filter((d) => d.year === selectedYear))
    : (data = data);

  const exportFlowData = data
    // .filter((d) => d.year === selectedYear)
    .filter((d) => d.product === selectedProduct)
    .map((d) => ({
      source: isTablet || isMobile ? d._project_id : d.project,
      target: isTablet || isMobile ? shortenText(d.importer) : d.importer,
      value: parseFloat(d.quantity),
    }));
  // .sort((a, b) => b.value - a.value); // Sort by quantity descending

  hasYear
    ? (data2 = data2.filter((d) => d.year === selectedYear))
    : (data2 = data2);

  const importerFlowData = data2
    // .filter((d) => d.year === selectedYear)
    .filter((d) => d.product === selectedProduct)
    .map((d) => ({
      source: isTablet || isMobile ? shortenText(d.importer) : d.importer,
      target: d.destination,
      value: parseFloat(d.quantity),
    }))
    .sort((a, b) => b.value - a.value); // Sort by quantity descending

  const sources = exportFlowData.map((d) => ({
    name: d.source,
    itemStyle: {
      color: "#f63185",
      borderColor: "#f63185",
    },
  }));

  const targets = exportFlowData.map((d) => ({
    name: d.target,
    itemStyle: {
      color: "#6E6A68",
      borderColor: "#6E6A68",
    },
  }));

  const importTarget = importerFlowData.map((d) => ({
    name: d.target,
    itemStyle: {
      color: "#ac7430",
      borderColor: "#ac7430",
    },
  }));

  // Merge sources and targets, then remove duplicates by converting to a Set and back to an array
  const _data = Array.from(
    new Set(
      [...sources, ...targets, ...importTarget].map((item) =>
        JSON.stringify(item),
      ),
    ),
  ).map((item) => JSON.parse(item));

  // Combine and sort the links
  const _links = [...exportFlowData, ...importerFlowData];

  const sankeyData = [
    {
      data: _data,
    },
    {
      links: _links,
    },
  ];

  return (
    <>
      {hasYear && (
        <div className="z-20 flex items-center justify-between gap-6 space-y-4 py-4 lg:space-y-0">
          <div className="text-start text-h5 font-medium tracking-tight">
            {projectInfo?.project_name ? (
              <div>
                <h2>{projectInfo?.project_name}</h2>
                <h4 className="text-sm tracking-wider text-foreground/70 md:text-h6">
                  <span className="border-b-2 border-primary/50 font-black">
                    {selectedYear}
                  </span>{" "}
                  Export Flows
                </h4>
              </div>
            ) : (
              <h2>{selectedProduct} Export Flows</h2>
            )}
          </div>
          <div>
            <YearToggle
              years={years}
              value={selectedYear}
              onChangeFunction={setSelectedYear}
            />
          </div>
        </div>
      )}

      <Card className="__card">
        <CardHeader className="p-2 sm:p-6">
          <div className="flex items-center justify-end">
            <ProductToggle
              defaultValue={selectedProduct}
              onValueChange={setSelectedProduct}
            />
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <SankeyChart
            data={sankeyData}
            height={isMobile ? chartHeight.mobile : chartHeight.others}
          />
        </CardContent>
      </Card>
    </>
  );
}
