import { Table } from "@tanstack/react-table";
import { CircleCheck, CircleX, Trophy } from "lucide-react";
import React from "react";

import Filter from "@/components/filter";
import DropdownItemIcon from "@/components/table/toolbar/DropdownItemIcon";

import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

interface WinFilterProps<TData> {
  table: Table<TData>;
}

function WinFilter<TData>({ table }: WinFilterProps<TData>) {
  return (
    <Filter
      title="Win"
      Icon={<Trophy />}
      options={Object.keys(
        Object.fromEntries(
          table.getColumn(COLUMN_ACCESSOR_KEYS.win)?.getFacetedUniqueValues() ||
            []
        )
      ).map((value) => ({
        label: value,
        value,
        icon:
          value === "Yes" ? (
            <DropdownItemIcon Element={CircleCheck} />
          ) : value === "No" ? (
            <DropdownItemIcon Element={CircleX} />
          ) : undefined,
      }))}
      column={table.getColumn(COLUMN_ACCESSOR_KEYS.win)}
    />
  );
}

export default WinFilter;
