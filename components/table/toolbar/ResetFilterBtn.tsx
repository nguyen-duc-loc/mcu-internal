import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

interface ResetFilterBtnProps<TData> {
  table: Table<TData>;
}

function ResetFilterBtn<TData>({ table }: ResetFilterBtnProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return isFiltered ? (
    <Button
      variant="ghost"
      onClick={() => table.resetColumnFilters()}
      className="px-2 lg:px-3"
    >
      Reset
      <X />
    </Button>
  ) : null;
}

export default ResetFilterBtn;
