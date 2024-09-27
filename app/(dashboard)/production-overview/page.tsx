"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import KPI from "./components/kpi";
import YearToggle from "@/components/year-toggle";
import ExportTrend from "./components/export-trend";
import TopDestinations from "./components/top-destinations";
import ProductionExports from "./components/production-exports";

import { Years } from "@/data/chartData";
import kpiData from "@/data/overview/kpi_data.json";
import nationalityShareData from "@/data/overview/co_cu_share_nationality.json";
import cobaltShareData from "@/data/overview/cobalt_share_nationality.json";
import copperShareData from "@/data/overview/copper_share_nationality.json";
import exportByProjectData from "@/data/overview/product_export_by_project.json";
import exportDestinationData from "@/data/overview/product_export_destination.json";
import exportShareByProjectData from "@/data/overview/export_share_by_project.json";

import {
  summarizeDestinations,
  transformTrendData,
} from "@/lib/dataProcessing";
import ExportTable from "./components/export-table";
import { ShareButton } from "@/components/elements/shareButton";
import {
  InputData,
  kpiTrendProps,
  OverviewDestinationSummary,
  shareDataByCountryProps,
  TransformedData,
  xhistoryProps,
  xShareDataProps,
} from "@/types/overview";
import { Skeleton } from "@/components/ui/skeleton";
import DonutChart from "@/components/charts/shadcn/pie-chart/donut";
import { CardDescription } from "@/components/ui/card";

type shareDataProps = {
  year: string;
  nationality: string;
  quantity: number;
  quantity_share: number;
  transaction: number;
  transaction_share: number;
}[];

type shareDataProps2 = {
  year: string;
  product: string;
  nationality: string;
  quantity: number;
  quantity_share: number;
  transaction: number;
  transaction_share: number;
}[];

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [kpi, setKpi] = useState<typeof kpiData>([]);
  const [coShareData, setCoShareData] = useState<shareDataByCountryProps>([]);
  const [cuShareData, setCuShareData] = useState<shareDataByCountryProps>([]);
  const [nationShareData, setNationShareData] =
    useState<shareDataByCountryProps>([]);
  const [coXhistory, setCoXhistory] = useState<xhistoryProps[]>([]);
  const [cuXhistory, setCuXhistory] = useState<xhistoryProps[]>([]);
  const [coDestSum, setCoDestSum] = useState<OverviewDestinationSummary[]>([]);
  const [cuDestSum, setCuDestSum] = useState<OverviewDestinationSummary[]>([]);
  const [xshareData, setXshareData] = useState<xShareDataProps>([]);

  useEffect(() => {
    const fetchkpiData = async () => {
      try {
        // Filter kpi data by year
        const filtered = kpiData.filter((row) => row.year === selectedYear);

        setKpi(filtered);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    const fetchShareData = async ({
      data,
      func,
    }: {
      data: shareDataProps | shareDataProps2;
      func: Function;
    }) => {
      try {
        const filtered = data
          .filter((row) => row.year === selectedYear)
          .map((row) => ({
            // product: row.product,
            country: row.nationality,
            quantity: parseFloat(row.quantity.toFixed(1)),
            share: parseFloat((row.quantity_share * 100).toFixed(1)),
            fill: "var(--color-${})".replace("${}", row.nationality),
          }));
        func(filtered);
      } catch (error) {
        console.error(
          "Error fetching and processing share by nationality data:",
          error,
        );
      }
    };

    const fetchExportByProjectData = async () => {
      try {
        // Filter data based on year
        const filteredhistory = exportByProjectData.filter(
          (row) => row.year === selectedYear,
        );

        // Then filter data based on both product
        const cofiltered: xhistoryProps[] = filteredhistory
          .filter((row) => row.product === "Cobalt")
          .map((row: any) => ({
            exporter: row.project,
            quantity: parseFloat(row.quantity),
          }));

        const cufiltered: xhistoryProps[] = filteredhistory
          .filter((row) => row.product === "Copper")
          .map((row: any) => ({
            exporter: row.project,
            quantity: parseFloat(row.quantity),
          }));

        setCoXhistory(cofiltered);
        setCuXhistory(cufiltered);
      } catch (error) {
        console.error(
          "Error fetching and processing production exports by projects data:",
          error,
        );
      }
    };

    const fetchDestinationData = async ({
      data,
      product,
      func,
    }: {
      data: any[];
      product: string;
      func: Function;
    }) => {
      try {
        // Filter data
        const filter1 = data.filter((row) => row.year === selectedYear);

        const filter2 = filter1
          .filter((row) => row.product === product)
          .map((row) => ({
            short_destination: row.short_destination,
            long_destination: row.long_destination,
            quantity: parseFloat(row.quantity),
            transaction: parseFloat(row.transaction),
          }));

        // Process data for chart - sort for top destinations
        const processedData = summarizeDestinations(filter2);

        func(processedData);
      } catch (error) {
        console.error("Error fetching and processing destination data:", error);
      }
    };

    const fetchExportShareByProjectData = async () => {
      try {
        const filtered = exportShareByProjectData.filter(
          (row) => row.year === selectedYear,
        );

        const data = filtered.map((row) => ({
          product: row.product,
          exporter: row.project,
          quantity: parseFloat(row.quantity),
          quantity_percent: parseFloat(
            (parseFloat(row.quantity_share) * 100).toFixed(2),
          ),
          transaction: parseInt(row.transaction),
          transaction_percent: parseFloat(
            (parseFloat(row.transaction_share) * 100).toFixed(2),
          ),
        }));

        setXshareData(data);
      } catch (error) {
        console.error(
          "Error fetching and processing total industral projects production data:",
          error,
        );
      }
    };

    fetchkpiData();
    fetchExportByProjectData();
    fetchDestinationData({
      data: exportDestinationData,
      product: "Cobalt",
      func: setCoDestSum,
    });
    fetchDestinationData({
      data: exportDestinationData,
      product: "Copper",
      func: setCuDestSum,
    });
    fetchShareData({ data: cobaltShareData, func: setCoShareData });
    fetchShareData({ data: copperShareData, func: setCuShareData });
    fetchShareData({ data: nationalityShareData, func: setNationShareData });
    fetchExportShareByProjectData();
  }, [selectedYear]);

  // Memoize processedKpiTrendData to avoid unnecessary recalculations
  const processedKpiTrendData: kpiTrendProps = useMemo(() => {
    return kpiData.map((row) => ({
      date: row.year,
      quantity: parseFloat(row.quantity),
      transaction: parseFloat(row.transaction),
      product: row.product,
    }));
  }, []);

  // Memoize quantityTrendData to avoid unnecessary recalculations
  const quantityTrendData: TransformedData = useMemo(() => {
    const data: InputData = kpiData.map((row) => ({
      date: row.year,
      quantity: row.quantity,
      product: row.product,
    }));
    return transformTrendData(data);
  }, []);

  // Memoize transactionTrendData to avoid unnecessary recalculations
  const transactionTrendData: TransformedData = useMemo(() => {
    const data: InputData = kpiData.map((row) => ({
      date: row.year,
      transaction: row.transaction,
      product: row.product,
    }));
    return transformTrendData(data);
  }, []);

  return (
    <main className="grid min-h-screen gap-6 sm:gap-6">
      <header className="__header items-center justify-between gap-6 space-y-4 lg:sticky lg:top-0 lg:flex lg:space-y-0">
        <h1 className="text-start text-h5 font-medium tracking-tight lg:text-h5 xl:text-h5">
          Copper and Cobalt Production Overview for{" "}
          <span className="border-b-2 border-primary/50 font-black">
            {selectedYear}
          </span>
        </h1>
        <div className="flex items-center justify-end">
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

      <section className="mb-24 mt-0 px-2 sm:mb-8 sm:mt-0 sm:px-8">
        <div className="flex flex-1 flex-col gap-4 md:gap-6">
          {/* KPI Cards */}
          <KPI kpi={kpi} kpiTrend={processedKpiTrendData} />

          <div className="grid items-start gap-4 md:gap-4 xl:grid-cols-3">
            <div className="space-y-4 xl:col-span-1">
              <DonutChart
                data={nationShareData}
                title="Countries present in the copper and cobalt sector in the DRC"
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1">
                <DonutChart
                  data={coShareData}
                  description={
                    <CardDescription className="px-4 py-4">
                      Shares of{" "}
                      <span className="text-p font-bold text-blue-500">
                        Cobalt
                      </span>{" "}
                      mining production by project groups
                    </CardDescription>
                  }
                />

                <DonutChart
                  data={cuShareData}
                  description={
                    <CardDescription className="px-4 py-4">
                      Shares of{" "}
                      <span className="text-p font-bold text-orange-500">
                        Copper
                      </span>{" "}
                      mining production by project groups
                    </CardDescription>
                  }
                />
              </div>
            </div>
            <div className="space-y-4 xl:col-span-2">
              {/* Exports of Product by Projects Chart */}
              <ProductionExports
                selectedYear={selectedYear}
                coXhistory={coXhistory}
                cuXhistory={cuXhistory}
              />

              {/* Top Destinations Chart */}
              <TopDestinations
                selectedYear={selectedYear}
                coDestSum={coDestSum}
                cuDestSum={cuDestSum}
              />
            </div>
          </div>

          {/* Eport Trend Cards */}
          <ExportTrend
            exportQuantityData={quantityTrendData}
            exportTransactionData={transactionTrendData}
          />

          <ExportTable data={xshareData} />
        </div>
      </section>
    </main>
  );
}
