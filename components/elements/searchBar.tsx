"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as Flags from "country-flag-icons/react/3x2";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CompaniesListProps } from "@/types/projects";
import useDeviceType from "@/hooks/useDeviceType";

type FlagProps = {
  countryCode: string;
};

const Flag = ({ countryCode }: FlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent className="h-5 w-8 rounded-[5px]" />;
};

export default function SearchBarDialog({
  data,
}: {
  data: CompaniesListProps;
}) {
  const { isMobile, isTablet } = useDeviceType();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const project_id = searchParams.get("project_id");

  const filteredCompanies = data
    .map((country) => ({
      ...country,
      children: country.children.filter((company) =>
        company.label.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((country) => country.children.length > 0);

  return (
    <div className="relative ml-auto lg:w-full">
      <Button
        variant="outline"
        size={isMobile || isTablet ? "icon" : "default"}
        className="__button_shadow __button_pressed __dark-muted rounded-full text-left font-normal lg:w-full lg:justify-start lg:rounded-md"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5 text-primary" />
        <span className="ml-2 hidden lg:block">Search companies...</span>
        <span className="sr-only">Search for companies</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[80vh] flex-col sm:max-w-[850px]">
          <DialogHeader>
            <DialogTitle>Search Companies</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-1 pb-20">
            <Input
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 w-full rounded-xl bg-muted pl-8 focus:border-0"
            />
            <ScrollArea className="h-full pb-10 pr-2">
              {filteredCompanies.map((country) => (
                <div key={country.value} className="mb-6">
                  <h3 className="mb-2 flex items-center text-lg font-semibold">
                    <span className="mr-2">
                      <Flag countryCode={country.flagCode} />
                    </span>
                    {country.label}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {country.children.length}
                    </span>
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-1 sm:gap-x-4 lg:grid-cols-3 xl:grid-cols-3">
                    {country.children.map((child) => (
                      <Link
                        key={child.value}
                        href={`/projects?project_id=${child.value.toLowerCase().trim()}`}
                        className={`__button_pressed group relative flex items-center justify-between rounded-md p-2 hover:bg-neutral-100 hover:dark:bg-muted ${project_id === child.value && "bg-neutral-100 text-foreground dark:bg-muted dark:text-foreground"}`}
                        onClick={() => setOpen(false)}
                      >
                        <p
                          className={`truncate text-sm ${project_id === child.value ? "font-semibold text-foreground" : "text-foreground/70"}`}
                        >
                          {child.label}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
