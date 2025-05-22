import { Table } from "@tanstack/react-table";
import { Eye, IdCard, KeyRound, Pencil } from "lucide-react";
import React from "react";

import Filter from "@/components/filter";
import DropdownItemIcon from "@/components/table/toolbar/DropdownItemIcon";

import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

interface RoleFilterProps<TData> {
  table: Table<TData>;
}

function RoleFilter<TData>({ table }: RoleFilterProps<TData>) {
  return (
    <Filter
      title="Role"
      Icon={<IdCard />}
      options={Object.keys(
        Object.fromEntries(
          table
            .getColumn(COLUMN_ACCESSOR_KEYS.role)
            ?.getFacetedUniqueValues() || []
        )
      )
        .map((value) => ({
          label: value,
          value,
          icon:
            value === "admin" ? (
              <DropdownItemIcon Element={KeyRound} />
            ) : value === "editor" ? (
              <DropdownItemIcon Element={Pencil} />
            ) : value === "viewer" ? (
              <DropdownItemIcon Element={Eye} />
            ) : undefined,
        }))
        .sort((r1, r2) => r1.value.localeCompare(r2.value))}
      column={table.getColumn(COLUMN_ACCESSOR_KEYS.role)}
    />
  );
}

export default RoleFilter;
