import React from "react";
import { ProcessingEntities } from "@/types";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * React component to display a popup with information about a processing entity.
 *
 * @param {{ project_name: string, geographic_coordinates: string, characteristics: string, annual_production: string, owners_shareholders: string, nationality: string, sources: string }} props
 * @returns {JSX.Element}
 */
export const PopupContent: React.FC<ProcessingEntities> = ({
  project_name,
  geographic_coordinates,
  characteristics,
  annual_production,
  owners_shareholders,
  nationality,
  sources,
}) => {
  return (
    <div className="p-2">
      <h4 className="mb-2 text-p font-bold text-black">{project_name}</h4>
      <ul className="space-y-1 text-sm font-medium text-black">
        {characteristics && (
          <li>
            <span className="text-black/70">Characteristics:</span>
            <p className="text-sm font-medium">{characteristics}</p>
          </li>
        )}
        {annual_production && (
          <li>
            <span className="text-black/70">Annual Production:</span>
            <p className="text-xl font-bold text-blue-600">
              {annual_production}
            </p>
          </li>
        )}
        {owners_shareholders && (
          <li>
            <span className="text-black/70">Owners/Shareholders:</span>
            <p className="font-medium">{owners_shareholders}</p>
          </li>
        )}
        {nationality && (
          <li>
            <span className="text-black/70">Nationality:</span> {nationality}
          </li>
        )}
        <li>
          <span className="text-black/70">Coordinates:</span>{" "}
          {geographic_coordinates}
        </li>
        {sources && (
          <li className="flex gap-1">
            <span className="font-semibold">Sources:</span>
            <Link
              href={sources}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 underline"
            >
              Link
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
