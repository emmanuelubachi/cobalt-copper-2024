"use client";
import React, { useState, useEffect } from "react";
import Map from "react-map-gl";

import active_sites from "@/data/map/mining_activities/active_sites.json";
import inactive_sites from "@/data/map/mining_activities/inactive_sites.json";

import { ArtisanalSiteDetailsProps } from "@/types/map";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const SiteMap = ({
  site_latitude,
  site_longitude,
}: {
  site_latitude?: number;
  site_longitude?: number;
}) => {
  const [viewState, setViewState] = useState({
    longitude: 23.52741376552,
    latitude: -3.050471588628,
    zoom: 15,
  });

  useEffect(() => {
    if (site_latitude && site_longitude) {
      setViewState({
        longitude: site_longitude,
        latitude: site_latitude,
        zoom: 15,
      });
    }
  }, [site_latitude, site_longitude]);

  return (
    <div className="relative h-56 w-full sm:h-80">
      <Map
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        maxZoom={16}
        minZoom={14}
        style={{ position: "absolute" }}
        attributionControl={false}
      ></Map>
    </div>
  );
};

const ArtisanalSiteDetails = ({
  data,
  className,
}: {
  data: ArtisanalSiteDetailsProps;
  className?: string;
}) => {
  return (
    <div className={`grid gap-4 p-4 sm:p-6 ${className}`}>
      <h2 className="text-xl font-medium">{data.site_name}</h2>

      <div className="mb-4 flex shrink grow flex-col space-y-6 text-sm font-medium text-foreground">
        <div className="grid gap-2">
          {data.province__territory && (
            <div>
              <p>
                <span className="font-medium text-foreground/70">
                  Province/Territory:{" "}
                </span>
                <span>{data.province__territory}</span>
              </p>
            </div>
          )}

          {/* {data.location_origin && (
            <div>
              <p>
                <span className="font-medium text-foreground/70">
                  Location Origin:{" "}
                </span>
                <span>{data.location_origin}</span>
              </p>
            </div>
          )} */}

          {data.cooperative_in_charge && (
            <div>
              <p>
                <span className="font-medium text-foreground/70">
                  Cooperative in charge:{" "}
                </span>
                <span>{data.cooperative_in_charge}</span>
              </p>
            </div>
          )}

          {data.minerals_extracted && (
            <div>
              <p>
                <span className="font-medium text-foreground/70">
                  Minerals extracted:{" "}
                </span>
                <span>{data.minerals_extracted}</span>
              </p>
            </div>
          )}

          {data.point_of_sale__purchasing_station && (
            <div>
              <p>
                <span className="font-medium text-foreground/70">
                  Point of sale/Purchasing station:{" "}
                </span>
                <span>{data.point_of_sale__purchasing_station}</span>
              </p>
            </div>
          )}

          {data.status_in_2023 && (
            <div>
              <p>
                <span className="font-medium text-foreground/70">
                  Status in 2023:{" "}
                </span>
                <span>{data.status_in_2023}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function ArtisanalSiteContent({ site_name }: { site_name: string }) {
  const artisanal_site_id = site_name;

  if (!artisanal_site_id) {
    return <div>No artisanal site selected</div>;
  }

  const activeSites = active_sites.data;
  const inactiveSites = inactive_sites.data;

  const artisanal_site_details =
    activeSites.find((site) => site.site_name === artisanal_site_id) ||
    inactiveSites.find((site) => site.site_name === artisanal_site_id);

  return (
    <div className="mx-auto">
      <SiteMap
        site_latitude={artisanal_site_details?.latitude}
        site_longitude={artisanal_site_details?.longitude}
      />
      <ArtisanalSiteDetails
        data={artisanal_site_details as ArtisanalSiteDetailsProps}
        className=""
      />
    </div>
  );
}

export function ProcessingEntitiesContent({
  site_name,
}: {
  site_name: string;
}) {
  return <div> {site_name}</div>;
}
