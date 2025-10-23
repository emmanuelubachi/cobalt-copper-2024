import { fetchData } from "@/lib/fetchData";
import { redirect } from "next/navigation";

import ErrorNotification from "@/components/elements/notification";

import IndustrialProjectsData from "@/data/projects/industrial_projects.json";
import ProductCompositionDestinationData from "@/data/projects/product_composition_destination.json";
import MonthlyExportsData from "@/data/projects/projects_monthly_exports.json";
import ExportFlowFromProjData from "@/data/export-flow/export_flow_from_projects.json";
import ExportFlowFromImportData from "@/data/export-flow/export_flow_from_importers.json";

import { SearchParams } from "@/types";

import { defaultPRoject } from "@/constants/application";
import MainPage from "./components/main-page";
import { Suspense } from "react";
import { PageLoadingFallback } from "@/components/loading";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { projectInfo, errorType } = await fetchData(searchParams);

  // Handle invalid parameters
  if (errorType === "invalidParams") {
    if (!searchParams.project_id) {
      redirect(`/projects?project_id=${defaultPRoject}`);
    } else {
      redirect("/companies");
    }
  }

  // Redirect if project info is missing
  if (!projectInfo || projectInfo.project_name === "") {
    redirect("/companies");
  }

  // Find the specific project data
  const projectData = IndustrialProjectsData?.find(
    (d) => d._project_id === projectInfo._project_id,
  );

  // Filter product composition data for the current project
  const productData = ProductCompositionDestinationData.filter(
    (d) => d._project_id === projectInfo._project_id,
  );

  // Extract unique production years and sort them
  const productionYears = Array.from(
    new Set(productData.map((item) => item.year)),
  ).sort((a, b) => parseInt(a) - parseInt(b));

  // Filter monthly export data for the current project
  const monthlyExportsData = MonthlyExportsData.filter(
    (d) => d._project_id === projectInfo._project_id,
  );

  const exportFlowFromProjData = ExportFlowFromProjData.filter(
    (d) => d._project_id === projectInfo._project_id,
  );

  const exportFlowFromImportData = ExportFlowFromImportData.filter(
    (d) => d._project_id === projectInfo._project_id,
  );

  return (
    <main className="max-w-screen-3xl mx-auto">
      <ErrorNotification errorType={errorType} />
      <Suspense fallback={<PageLoadingFallback />}>
        <MainPage
          {...{
            projectInfo,
            projectData,
            productData,
            productionYears,
            monthlyExportsData,
            exportFlowFromProjData,
            exportFlowFromImportData,
          }}
        />
      </Suspense>
    </main>
  );
}
