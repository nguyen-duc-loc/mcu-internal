"use client";

import { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

interface ToggleSortButton<TData> {
  header: string;
  column: Column<TData>;
  className?: string;
}

function ToggleSortButton<TData>({
  header,
  column,
  className,
}: ToggleSortButton<TData>) {
  const sortDirection = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(sortDirection === "asc")}
      className={className}
    >
      {header}
      {sortDirection === false ? (
        <ArrowUpDown />
      ) : sortDirection === "asc" ? (
        <ArrowUp />
      ) : (
        <ArrowDown />
      )}
    </Button>
  );
}

export default ToggleSortButton;
