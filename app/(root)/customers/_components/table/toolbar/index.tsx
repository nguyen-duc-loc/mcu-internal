import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";
import React from "react";

import Search from "@/components/search";
import ResetFilterBtn from "@/components/table/toolbar/ResetFilterBtn";
import { Button } from "@/components/ui/button";
import { exportTableToCSV } from "@/lib/export";

import MonthFilter from "./MonthFilter";
import QuarterFilter from "./QuarterFilter";
import StatusFilter from "./StatusFilter";
import WinFilter from "./WinFilter";
import YearFilter from "./YearFilter";
import { COLUMN_ACCESSOR_KEYS } from "../../../_constants/columnAccessorKey";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function Toolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap gap-2">
      <Search
        placeholder="Search customer..."
        table={table}
        column={COLUMN_ACCESSOR_KEYS.customerName}
      />
      <div className="flex grow flex-wrap justify-between gap-4 max-md:flex-col">
        <div className="flex flex-wrap gap-2">
          <YearFilter table={table} />
          <QuarterFilter table={table} />
          <MonthFilter table={table} />
          <StatusFilter table={table} />
          <WinFilter table={table} />
          <ResetFilterBtn table={table} />
        </div>
        <Button
          variant="outline"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "mcu-internal-customers-report",
              excludeColumns: ["endYear", "endMonth", "endQuarter"],
            })
          }
        >
          <Download />
          Export
        </Button>
      </div>
    </div>
  );
}

export default Toolbar;
