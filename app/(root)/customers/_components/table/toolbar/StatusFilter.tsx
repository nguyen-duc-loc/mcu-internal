import { Table } from "@tanstack/react-table";
import { CheckCheck, CircleCheckBig, Hourglass } from "lucide-react";
import React from "react";

import Filter from "@/components/filter";
import DropdownItemIcon from "@/components/table/toolbar/DropdownItemIcon";

import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

interface StatusFilterProps<TData> {
  table: Table<TData>;
}

function StatusFilter<TData>({ table }: StatusFilterProps<TData>) {
  return (
    <Filter
      title="Status"
      Icon={<CheckCheck />}
      options={Object.keys(
        Object.fromEntries(
          table
            .getColumn(COLUMN_ACCESSOR_KEYS.status)
            ?.getFacetedUniqueValues() || []
        )
      ).map((value) => ({
        label: value,
        value,
        icon:
          value === "In Progress" ? (
            <DropdownItemIcon Element={Hourglass} />
          ) : value === "Completed" ? (
            <DropdownItemIcon Element={CircleCheckBig} />
          ) : undefined,
      }))}
      column={table.getColumn(COLUMN_ACCESSOR_KEYS.status)}
    />
  );
}

export default StatusFilter;
