"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import Pagination from "@/components/table/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";

import { columns } from "./columns";
import Toolbar from "./toolbar";
import { COLUMN_ACCESSOR_KEYS } from "../../_constants/columnAccessorKey";
import { COLUMN_IDS } from "../../_constants/columnId";

interface DataTableProps {
  data: Customer[];
}

const CustomersDataTable = ({ data }: DataTableProps) => {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      [COLUMN_ACCESSOR_KEYS.endYear]: false,
      [COLUMN_ACCESSOR_KEYS.endQuarter]: false,
      [COLUMN_ACCESSOR_KEYS.endMonth]: false,
    });
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: true,
      id: COLUMN_IDS.endDate,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const filteredRows = table.getFilteredRowModel().rows;

  return (
    <div className="space-y-6">
      <div>
        <h2>
          <span className="text-base tracking-tight">Number of customers:</span>
          <span className="ml-2 text-lg font-bold">{filteredRows.length}</span>
        </h2>
        <h2>
          <span className="text-base tracking-tight">Total revenue:</span>
          <span className="ml-2 text-lg font-bold">
            {formatMoney(
              filteredRows.reduce(
                (prevRevenue, row) =>
                  prevRevenue + row.original.funding + row.original.proservice,
                0
              )
            )}
          </span>
        </h2>
      </div>

      <Toolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
};

export default CustomersDataTable;
