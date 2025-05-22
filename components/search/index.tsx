"use client";

import { Table } from "@tanstack/react-table";
import { Search as SearchIcon } from "lucide-react";
import React from "react";

import { Input } from "@/components/ui/input";

interface SearchProps<TData> {
  table: Table<TData>;
  placeholder: string;
  column: string;
}

function Search<TData>({ table, placeholder, column }: SearchProps<TData>) {
  return (
    <div className="flex h-10 max-w-[280px] grow items-center gap-2 rounded-md border bg-background px-4">
      <SearchIcon className="size-5 cursor-pointer" />
      <Input
        type="text"
        placeholder={placeholder}
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(column)?.setFilterValue(event.target.value)
        }
        className="h-8 border-none py-0 text-sm shadow-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
    </div>
  );
}

export default Search;
