import { Table } from "@tanstack/react-table";
import React from "react";

import Search from "@/components/search";
import ResetFilterBtn from "@/components/table/toolbar/ResetFilterBtn";

import RoleFilter from "./RoleFilter";
import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function Toolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap gap-2">
      <Search
        placeholder="Search email..."
        table={table}
        column={COLUMN_ACCESSOR_KEYS.email}
      />
      <div className="flex grow flex-wrap justify-between gap-4 max-md:flex-col">
        <div className="flex flex-wrap gap-2">
          <RoleFilter table={table} />
          <ResetFilterBtn table={table} />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
