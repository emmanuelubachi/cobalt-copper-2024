"use client";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn } from "@/lib/utils";

type YearToggleProps = {
  years: string[];
  value?: string;
  className?: string;
  isDynamic?: boolean;
  dynamicYears?: string[];
  onChangeFunction: (value: string) => void;
};

/**
 * A toggle group that allows the user to select between multiple years.
 *
 * @param {{ years: string[], value?: string, className?: string, isDynamic?: boolean, dynamicYears?: string[], onChangeFunction: (value: string) => void }} props
 * @param {string[]} props.years - The list of years to display as options in the toggle group.
 * @param {string} [props.value] - The initial value of the toggle group.
 * @param {string} [props.className] - The class name to be applied to the outermost element of the component.
 * @param {boolean} [props.isDynamic=false] - Whether the list of years is dynamic and should be filtered based on the `dynamicYears` prop.
 * @param {string[]} [props.dynamicYears=[]] - The list of years to filter the `years` prop by if `isDynamic` is true.
 * @param {(value: string) => void} props.onChangeFunction - The callback function to be called when the value of the toggle group changes.
 * @returns {JSX.Element}
 */
export default function YearToggle({
  years,
  value,
  className,
  isDynamic = false,
  dynamicYears = [], // Default to empty array if not provided
  onChangeFunction,
}: YearToggleProps) {
  if (isDynamic) {
    const referenceList = years;
    const missingYears = referenceList.filter(
      (year) => !dynamicYears?.includes(year),
    );
    return (
      <div className="flex w-full items-center justify-end gap-2">
        <ToggleGroup
          type="single"
          unselectable="off"
          size={"sm"}
          value={value}
          onValueChange={(value) => {
            if (value) onChangeFunction(value);
          }}
          className={cn("__button_shadow gap-1 rounded-lg bg-muted p-1", {
            className,
          })}
        >
          {years.map((year) => (
            <ToggleGroupItem
              key={year}
              value={year}
              size="sm"
              aria-label={`Toggle year ${year}`}
              disabled={missingYears.includes(year)}
              className={cn(
                "__button_pressed rounded-md bg-transparent px-2 py-0 text-2xs text-foreground/70 sm:text-xs",
                "data-[state=on]:bg-primary data-[state=on]:font-black data-[state=on]:text-white data-[state=on]:ring-1 data-[state=on]:ring-neutral-200",
                "hover:data-[state=on]:bg-primary data-[state=off]:hover:text-primary data-[state=on]:hover:text-white",
                "dark:bg-muted/80 dark:ring-0 dark:data-[state=on]:bg-background data-[state=off]:dark:hover:text-foreground",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {year}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <ToggleGroup
        type="single"
        unselectable="off"
        size={"sm"}
        value={value}
        onValueChange={(value) => {
          if (value) onChangeFunction(value);
        }}
        className={cn("__button_shadow gap-1 rounded-lg bg-muted p-1", {
          className,
        })}
      >
        {years.map((year) => (
          <ToggleGroupItem
            key={year}
            value={year}
            size="sm"
            aria-label={`Toggle year ${year}`}
            className={cn(
              "__button_pressed rounded-md bg-transparent px-2 py-0 text-2xs text-foreground/70 sm:text-xs",
              "data-[state=on]:bg-primary data-[state=on]:font-black data-[state=on]:text-white data-[state=on]:ring-1 data-[state=on]:ring-neutral-200",
              "hover:data-[state=on]:bg-primary data-[state=off]:hover:text-primary data-[state=on]:hover:text-white",
              "dark:bg-muted/80 dark:ring-0 dark:data-[state=on]:bg-background data-[state=off]:dark:hover:text-foreground",
            )}
          >
            {year}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
