import { Table } from "@tanstack/react-table";
import { Calendar } from "lucide-react";
import React from "react";

import Filter from "@/components/filter";

import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

interface StatusFilterProps<TData> {
  table: Table<TData>;
}

function YearFilter<TData>({ table }: StatusFilterProps<TData>) {
  return (
    <Filter
      title="Year"
      Icon={<Calendar />}
      options={Object.keys(
        Object.fromEntries(
          table
            .getColumn(COLUMN_ACCESSOR_KEYS.endYear)
            ?.getFacetedUniqueValues() || []
        )
      )
        .map((value) => ({ label: value, value }))
        .sort((y1, y2) => y2.value.localeCompare(y1.value))}
      column={table.getColumn(COLUMN_ACCESSOR_KEYS.endYear)}
    />
  );
}

export default YearFilter;
