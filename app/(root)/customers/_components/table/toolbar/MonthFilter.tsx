import { Table } from "@tanstack/react-table";
import { Calendar } from "lucide-react";
import React from "react";

import Filter from "@/components/filter";

import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

const mapMonthNumberToString: { [key: string]: string } = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
  "-": "-",
};

interface MonthFilterProps<TData> {
  table: Table<TData>;
}

function MonthFilter<TData>({ table }: MonthFilterProps<TData>) {
  return (
    <Filter
      title="Month"
      Icon={<Calendar />}
      options={Object.keys(
        Object.fromEntries(
          table
            .getColumn(COLUMN_ACCESSOR_KEYS.endMonth)
            ?.getFacetedUniqueValues() || []
        )
      ).map((value) => ({ label: mapMonthNumberToString[value], value }))}
      column={table.getColumn(COLUMN_ACCESSOR_KEYS.endMonth)}
    />
  );
}

export default MonthFilter;
