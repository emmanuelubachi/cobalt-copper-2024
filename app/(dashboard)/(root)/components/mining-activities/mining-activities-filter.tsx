import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapFilterStore from "@/store/mapFilterStore";
import CheckBoxTreeWithFilter from "@/components/m-ui/checkbox-tree";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { Toggle } from "@/components/ui/toggle";
import { IndustrialProjectsNode } from "@/constants/application";

const nodes = IndustrialProjectsNode;

const expanded = [""];

export function ArtisanalSites() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useUpdateSearchParams();
  const active_site_sParams = searchParams.get("active_site");
  const inactive_site_sParams = searchParams.get("inactive_site");
  const {
    showActiveSiteMarkers,
    toggleActiveSiteMarkers,

    showInactiveSiteMarkers,
    toggleInactiveSiteMarkers,
  } = useMarkerVisibilityStore();

  const {
    isActiveSitesButtonVisible,
    toggleActiveSiteButton,
    showActiveSiteButton,

    isInactiveSitesButtonVisible,
    toggleInactiveSiteButton,
    showInactiveSiteButton,
  } = useMapFilterStore();

  useEffect(() => {
    if (active_site_sParams === "true") {
      showActiveSiteButton();
      showActiveSiteMarkers();
    }
  }, [active_site_sParams, showActiveSiteButton, showActiveSiteMarkers]);

  useEffect(() => {
    if (inactive_site_sParams === "true") {
      showInactiveSiteButton();
      showInactiveSiteMarkers();
    }
  }, [inactive_site_sParams, showInactiveSiteButton, showInactiveSiteMarkers]);

  return (
    <div className="flex w-full flex-col gap-2">
      <h6 className="text-p font-semibold">Artisanal Mining Sites</h6>
      <div className="__toggle_container border-cyan-500">
        <div>
          <h6 className="text-xs font-medium">Active Sites</h6>
        </div>
        <div className="flex gap-2">
          <Toggle
            pressed={isActiveSitesButtonVisible}
            onPressedChange={() => {
              const new_active_site = !isActiveSitesButtonVisible;
              toggleActiveSiteButton();
              toggleActiveSiteMarkers(),
                router.push(
                  pathname +
                    "?" +
                    createQueryString(
                      "active_site",
                      new_active_site.toString(),
                    ),
                );
            }}
            className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
              isActiveSitesButtonVisible
                ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
                : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
                isActiveSitesButtonVisible
                  ? "translate-x-2 dark:bg-black"
                  : "-translate-x-2"
              }`}
            />
          </Toggle>
        </div>
      </div>

      <div className="__toggle_container border-neutral-500">
        <div>
          <h6 className="text-xs font-medium">Inactive Sites</h6>
        </div>
        <div className="flex gap-2">
          <Toggle
            pressed={isInactiveSitesButtonVisible}
            onPressedChange={() => {
              const new_inactive_site = !isInactiveSitesButtonVisible;
              toggleInactiveSiteButton();
              toggleInactiveSiteMarkers(),
                router.push(
                  pathname +
                    "?" +
                    createQueryString(
                      "inactive_site",
                      new_inactive_site.toString(),
                    ),
                );
            }}
            className={`group relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
              isInactiveSitesButtonVisible
                ? "data-[state=on]:bg-cyan-500 hover:bg-cyan-500"
                : "bg-neutral-400/50 hover:bg-neutral-400 dark:bg-transparent dark:ring-1 dark:ring-neutral-400/50 dark:hover:bg-neutral-400/40"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-300 group-hover:scale-125 ${
                isInactiveSitesButtonVisible
                  ? "translate-x-2 dark:bg-black"
                  : "-translate-x-2"
              }`}
            />
          </Toggle>
        </div>
      </div>
    </div>
  );
}

export function IndustrialProjects() {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-p font-semibold">Industrial Projects</h6>
      <CheckBoxTreeWithFilter nodes={nodes} expandedNodes={expanded} />
    </div>
  );
}
