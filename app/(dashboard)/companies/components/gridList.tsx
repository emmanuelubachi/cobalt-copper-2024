"use client";
import React from "react";
import Link from "next/link";
import * as Flags from "country-flag-icons/react/3x2";
import { ArrowUpRight } from "lucide-react";

import useFilterStore from "@/store/filterStore";

import { Separator } from "@/components/ui/separator";
import { CompaniesListProps } from "@/types/projects";

type FlagProps = {
  countryCode: string;
};

const Flag = ({ countryCode }: FlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent className="h-5 w-8 rounded-[5px]" />;
};

export default function GridList({ data }: { data: CompaniesListProps }) {
  const { closeFilter } = useFilterStore();

  return (
    <div className="space-y-2">
      <div className="mt-2 gap-3 space-y-6 sm:mt-4">
        {data.map((member) => (
          <div key={member.value} className="space-y-4 sm:space-y-6">
            <div className="w-full" key={member.value}>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Flag countryCode={member.flagCode} />
                  <h2 className="px-2 text-h6 font-medium text-foreground">
                    {member.label}
                  </h2>
                </div>

                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-pxs font-medium text-tremor-content-strong dark:bg-muted dark:text-dark-tremor-content-strong">
                  {member.children.length}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-1 sm:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
                {member.children.map((child) => (
                  <Link
                    key={child.value}
                    href={`/projects?project_id=${child.value.toLowerCase().trim()}`}
                    className="__button_pressed group relative flex items-center justify-between rounded-md p-2 hover:bg-neutral-100 hover:dark:bg-muted"
                    onClick={closeFilter}
                  >
                    <p className="truncate text-sm text-foreground/70">
                      {child.label}
                    </p>

                    <span
                      className="pointer-events-none hidden text-neutral-400 group-hover:text-foreground/70 dark:text-neutral-700 lg:block"
                      aria-hidden={true}
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden={true} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}
