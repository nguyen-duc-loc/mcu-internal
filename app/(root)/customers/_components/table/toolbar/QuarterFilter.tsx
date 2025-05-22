import { Table } from "@tanstack/react-table";
import { Calendar } from "lucide-react";
import React from "react";

import Filter from "@/components/filter";

import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

const mapQuarterNumberToString: { [key: string]: string } = {
  "1": "First",
  "2": "Second",
  "3": "Third",
  "4": "Fourth",
  "-": "-",
};

interface QuarterFilterProps<TData> {
  table: Table<TData>;
}

function QuarterFilter<TData>({ table }: QuarterFilterProps<TData>) {
  return (
    <Filter
      title="Quarter"
      Icon={<Calendar />}
      options={Object.keys(
        Object.fromEntries(
          table
            .getColumn(COLUMN_ACCESSOR_KEYS.endQuarter)
            ?.getFacetedUniqueValues() || []
        )
      ).map((value) => ({ label: mapQuarterNumberToString[value], value }))}
      column={table.getColumn(COLUMN_ACCESSOR_KEYS.endQuarter)}
    />
  );
}

export default QuarterFilter;
