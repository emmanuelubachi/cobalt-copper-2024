"use client";
import { useEffect, useState } from "react";
import { MultipleBarChart2 } from "@/components/charts/shadcn/bar-chart/multiple-bar-chart";

import {
  chartConfig,
  coMonthlyXConfig,
  cuMonthlyXConfig,
} from "@/constants/chart";

import { ProjectDataProps } from "@/types/projects";
import YearToggle from "@/components/year-toggle";
import { Years } from "@/data/chartData";
import TreeMapChart from "@/components/charts/shadcn/tree-map/custom-treemap";
import { treeMapChartConfig } from "@/constants/chart";
import {
  groupByProductAndConcentration,
  sortDataByMonth,
  transformProdDesData,
} from "@/lib/dataProcessing";
import ProjectDetails from "./project-details";
import { ProjectInfo } from "@/types";
import MixedBarChart from "@/components/charts/shadcn/bar-chart/mixed-bar-chart";
import SiteMap from "./map";
import { cn } from "@/lib/utils";
import useDeviceType from "@/hooks/useDeviceType";

export default function Projects({
  projectInfo,
  projectData,
  productData,
  productionYears,
  monthlyExportData,
}: {
  projectInfo: ProjectInfo;
  projectData: ProjectDataProps;
  productData: any[];
  productionYears: string[];
  monthlyExportData: any[];
}) {
  const project_id = projectInfo._project_id;
  const { isMobile } = useDeviceType();

  const maxYear =
    productionYears.length > 0
      ? Math.max(...productionYears.map(Number)).toString()
      : undefined;

  // Manage the selected year in state
  const [selectedYear, setSelectedYear] = useState<string | undefined>(maxYear);

  // Update the selected year when productionYears or maxYear changes
  useEffect(() => {
    // Determine the maximum year from productionYears
    const maxYear =
      productionYears.length > 0
        ? Math.max(...productionYears.map(Number)).toString()
        : undefined;
    setSelectedYear(maxYear);
  }, [productionYears, project_id]);

  // Filter and transform product data for the selected year
  const products = productData
    .filter((d) => d.year === selectedYear)
    .map((d) => ({
      product: d.product as string,
      concentration: d.concentration as string,
      quantity: parseInt(d.quantity),
      transaction: parseInt(d.transaction),
    }))
    .sort((a, b) => b.quantity - a.quantity);

  // Filter and transform destination data for the selected year
  const destinationData = productData
    .filter((d) => d.year === selectedYear)
    .map((d) => ({
      destination: d.destination,
      product: d.product,
      quantity: parseInt(d.quantity),
      transaction: parseInt(d.transaction),
    }));

  // Filter and transform monthly export data for the selected year
  const monthlyExports = monthlyExportData
    .filter((d) => d.year === selectedYear)
    .map((d) => ({
      product: d.product,
      month: d.month,
      quantity: parseInt(d.quantity),
    }));

  const maxMonthlyExport = Math.max(...monthlyExports.map((d) => d.quantity));

  const coMontlyExports = sortDataByMonth(
    monthlyExports.filter((d) => d.product === "Cobalt"),
  );
  const cuMontlyExports = sortDataByMonth(
    monthlyExports.filter((d) => d.product === "Copper"),
  );

  return (
    <section className="space-y-0">
      <header
        className={cn(
          "left-0 right-0 z-20 flex w-full flex-col-reverse gap-4 space-y-2 bg-background/50 px-2 py-2 backdrop-blur-md",
          "top-0 dark:bg-neutral-900/50 sm:justify-between sm:px-8 sm:py-4 lg:sticky lg:mb-4 lg:flex-row lg:space-y-0",
        )}
      >
        <h2 className="text-start text-h5 font-medium tracking-tight">
          {projectInfo.project_name}
        </h2>
        <div className="ml-auto flex w-full flex-col items-center justify-end gap-2 md:w-fit md:flex-row">
          <YearToggle
            value={selectedYear}
            onChangeFunction={setSelectedYear}
            years={Years}
            isDynamic
            dynamicYears={productionYears}
          />
        </div>
      </header>

      {/* Charts */}
      <div className="mb-24 items-start space-y-4 px-2 pb-24 sm:mb-0 sm:px-8 sm:pb-8">
        <div className="grid items-start gap-4 xl:grid-cols-3">
          {/* Project Info and Treemap */}
          <div className="space-y-8 xl:col-span-2 xl:space-y-8">
            {products.length > 0 && (
              <ProjectDetails
                projectData={projectData}
                productData={products}
                year={selectedYear}
              />
            )}

            {/* Product Composition */}
            {products.length > 0 && (
              <TreeMapChart
                title={`Product Composition in ${selectedYear}`}
                description="Quantity in Tonnes"
                config={treeMapChartConfig}
                namekey="concentration"
                sizekey="quantity"
                chartData={groupByProductAndConcentration(products)}
              />
            )}
          </div>

          {/* Destination */}
          <div className="grid grid-cols-1 gap-4">
            {!isMobile &&
              destinationData.length > 0 &&
              projectData &&
              projectData.latitude &&
              projectData.longitude && (
                <SiteMap
                  site_latitude={parseFloat(projectData.latitude)}
                  site_longitude={parseFloat(projectData.longitude)}
                />
              )}

            {destinationData.length > 0 && (
              <MixedBarChart
                title={`Top Destinations of ${projectInfo.project_name} Exports in ${selectedYear}`}
                description="Quantity in Tonnes"
                config={chartConfig}
                chartData={transformProdDesData(destinationData)}
              />
            )}
          </div>
        </div>
        {/* Monthly Production */}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
          {coMontlyExports.length > 0 && (
            <div className="">
              <MultipleBarChart2
                title={`Monthly Exports of Cobalt by ${projectInfo.project_name} in ${selectedYear}`}
                description="Quantity in Tonnes"
                config={coMonthlyXConfig}
                chartData={coMontlyExports}
                firstDataKey="quantity"
                classname="h-64"
                domain={[0, maxMonthlyExport]}
              />
            </div>
          )}
          {cuMontlyExports.length > 0 && (
            <div className="">
              <MultipleBarChart2
                title={`Monthly Exports of Copper by ${projectInfo.project_name} in ${selectedYear}`}
                description="Quantity in Tonnes"
                config={cuMonthlyXConfig}
                chartData={cuMontlyExports}
                firstDataKey="quantity"
                classname="h-64"
                domain={[0, maxMonthlyExport]}
                // footNote={
                //   <div className="leading-none text-muted-foreground">
                //     Includes quantities both exported and sold locally.
                //   </div>
                // }
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
