"use client";

import { Column } from "@tanstack/react-table";
import { Check } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FilterProps<TData, TValue> {
  title?: string;
  Icon?: React.ReactNode;
  column?: Column<TData, TValue>;
  options: {
    label: string;
    value: string | number | boolean;
    icon?: React.ReactNode;
  }[];
}

function Filter<TData, TValue>({
  column,
  title,
  Icon,
  options,
}: FilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 border-dashed text-xs"
        >
          {Icon}
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter(({ value }) => selectedValues.has(String(value)))
                    .map(({ label, value }) => (
                      <Badge
                        variant="secondary"
                        key={String(value)}
                        className="rounded-sm px-1 font-normal capitalize"
                      >
                        {label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command className="flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const { icon, label } = option;
                const value = String(option.value);
                const isSelected = selectedValues.has(value);

                return (
                  <CommandItem
                    key={value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(value);
                      } else {
                        selectedValues.add(value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check />
                    </div>
                    {icon}
                    <span className="font-sans capitalize">{label}</span>
                    {facets?.get(String(option.value)) && (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(String(option.value))}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Filter;
