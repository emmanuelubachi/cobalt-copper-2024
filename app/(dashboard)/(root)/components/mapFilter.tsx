"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArtisanalSites,
  IndustralProjects,
} from "./mining-activites/mining-activities-filter";
import {
  BorderPosts,
  EnvironmantalImpact,
  ExportPorts,
  InternationalRoutes,
  ProcessingEntities,
  SocioEconomic,
} from "./additional-information/additional-info-filter";
import { Separator } from "@/components/ui/separator";

type MapFilterProps = {
  defaultValue: "mining-activities" | "additional-information";
};

export default function MapFilter({ defaultValue }: MapFilterProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="w-72 overflow-hidden pb-16 sm:w-80"
    >
      <div className="px-2 py-3 sm:px-3 sm:py-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="mining-activities"
            className="text-pxs lg:text-xs"
          >
            Mining Activities
          </TabsTrigger>

          <TabsTrigger
            value="additional-information"
            className="text-pxs lg:text-xs"
          >
            Additional Information
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="mining-activities"
        className="mt-0 h-full space-y-6 overflow-y-auto px-4 pb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted sm:mt-5 sm:space-y-6 sm:px-5"
      >
        <div>
          <h6 className="text-h6 font-semibold">Mining Activities</h6>
          {/* <p className="text-xs italic text-foreground/40">
            Beatae quia excepturi dignissimos autem natus inventore quas amet
            praesentium earum iste.
          </p> */}
        </div>
        <ArtisanalSites />
        <Separator />
        <IndustralProjects />
      </TabsContent>

      <TabsContent
        value="additional-information"
        className="mt-0 h-full space-y-6 overflow-y-auto px-4 pb-5 sm:mt-5 sm:space-y-8 sm:px-5"
      >
        <div>
          <h6 className="text-h6 font-semibold">Additional Information</h6>
          {/* <p className="text-xs italic text-foreground/40">
            Beatae quia excepturi dignissimos autem natus inventore quas amet
            praesentium earum iste, perspiciatis dolores, ea ipsam.
          </p> */}
        </div>
        <div className="grid gap-4">
          <ProcessingEntities />

          <Separator className="" />

          <div className="grid gap-2">
            <h6 className="text-p font-semibold">Geographical Information</h6>
            <BorderPosts />
            <InternationalRoutes />
            <ExportPorts />
          </div>
          <Separator className="" />
          <SocioEconomic />
          <Separator className="" />
          <EnvironmantalImpact />
        </div>
      </TabsContent>
    </Tabs>
  );
}
