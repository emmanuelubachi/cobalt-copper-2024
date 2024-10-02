import React from "react";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import { Toggle } from "@/components/ui/toggle";

export function ProcessingEntities() {
  const { isProcessingEntiteMarkerVisible, toggleProcessingEntiteMarkers } =
    useMarkerVisibilityStore();
  return (
    <div className="__toggle_container border-teal-500">
      <div>
        <h6 className="text-xs font-medium">Processing Entities</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isProcessingEntiteMarkerVisible}
          onPressedChange={toggleProcessingEntiteMarkers}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isProcessingEntiteMarkerVisible
              ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isProcessingEntiteMarkerVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function InternationalRoutes() {
  const { isInternationalRouteVisible, toggleInternationalRoute } =
    useMarkerVisibilityStore();
  return (
    <div className="__toggle_container border-blue-500">
      <div>
        <h6 className="text-xs font-medium">International Routes</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isInternationalRouteVisible}
          onPressedChange={toggleInternationalRoute}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isInternationalRouteVisible
              ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isInternationalRouteVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function BorderPosts() {
  const { isBorderPostVisible, toggleBorderPost } = useMarkerVisibilityStore();
  return (
    <div className="__toggle_container border-orange-500">
      <div>
        <h6 className="text-xs font-medium">Border Posts</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isBorderPostVisible}
          onPressedChange={toggleBorderPost}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isBorderPostVisible
              ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isBorderPostVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function ExportPorts() {
  const { isExportPortVisible, toggleExportPort } = useMarkerVisibilityStore();
  return (
    <div className="__toggle_container border-slate-500">
      <div>
        <h6 className="text-xs font-medium">Export Ports</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isExportPortVisible}
          onPressedChange={toggleExportPort}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isExportPortVisible
              ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isExportPortVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function SocioEconomic() {
  const { isSocioEconomicVisible, toggleSocioEconomic } =
    useMarkerVisibilityStore();
  return (
    <div className="__toggle_container border-lime-500">
      <div>
        <h6 className="text-xs font-medium">Socio Economic Projects</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isSocioEconomicVisible}
          onPressedChange={toggleSocioEconomic}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isSocioEconomicVisible
              ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isSocioEconomicVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}

export function EnvironmantalImpact() {
  const { isEnvironmentalImpactVisible, toggleEnvironmentalImpact } =
    useMarkerVisibilityStore();
  return (
    <div className="__toggle_container border-red-500">
      <div>
        <h6 className="text-xs font-medium">Environmantal Impact</h6>
      </div>
      <div className="flex gap-2">
        <Toggle
          pressed={isEnvironmentalImpactVisible}
          onPressedChange={toggleEnvironmentalImpact}
          className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isEnvironmentalImpactVisible
              ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
              : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
              isEnvironmentalImpactVisible
                ? "translate-x-2 dark:bg-black"
                : "-translate-x-2"
            }`}
          />
        </Toggle>
      </div>
    </div>
  );
}
