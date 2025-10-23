"use client";
import React, { Suspense, useState } from "react";

import YearToggle from "@/components/year-toggle";
import ExportFlow from "@/components/elements/export-flow";
import { ShareButton } from "@/components/elements/shareButton";

import ExportFlowFromProjData from "@/data/export-flow/export_flow_from_projects.json";
import ExportFlowFromImportData from "@/data/export-flow/export_flow_from_importers.json";
import { Skeleton } from "@/components/ui/skeleton";

const Years = ["2022", "2023", "2024"];

export default function Page() {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  const exportFromProjData = ExportFlowFromProjData.filter(
    (data) => data.year === selectedYear,
  );

  const exportFromImportData = ExportFlowFromImportData.filter(
    (data) => data.year === selectedYear,
  );

  return (
    <main className="max-w-screen-3xl mx-auto">
      <header className="__header flex items-center justify-between gap-4">
        <h1 className="text-center text-h6 font-medium tracking-tight lg:text-start lg:text-h5 xl:text-h5">
          Export Flows for{" "}
          <span className="border-b-2 border-primary/50 font-black">
            {selectedYear}
          </span>
        </h1>
        <div className="flex items-center justify-center sm:items-start lg:justify-end">
          <div className="flex items-center gap-2">
            <YearToggle
              value={selectedYear}
              onChangeFunction={setSelectedYear}
              years={Years}
            />
            <div>
              <Suspense
                fallback={<Skeleton className="h-12 w-12 rounded-full" />}
              >
                <ShareButton />
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-24 mt-4 min-h-screen px-2 sm:mb-8 sm:mt-8 sm:px-8">
        <ExportFlow
          data={exportFromProjData}
          data2={exportFromImportData}
          hasYear={false}
        />
      </section>
    </main>
  );
}
