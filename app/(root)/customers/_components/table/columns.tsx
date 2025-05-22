import { ColumnDef } from "@tanstack/react-table";
import { format, getYear, getMonth } from "date-fns";

import Badge from "@/components/table/cell/Badge";
import ToggleSortButton from "@/components/table/header/ToggleSortButton";
import { formatMoney } from "@/lib/utils";

import { COLUMN_ACCESSOR_KEYS } from "../../_constants/columnAccessorKey";
import { COLUMN_IDS } from "../../_constants/columnId";
import Link from "next/link";
import ROUTES from "@/constants/routes";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.customerID,
    accessorFn: (row) => row.id,
    enableHiding: true,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.customerName,
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <Link
        href={ROUTES.customer(row.getValue(COLUMN_ACCESSOR_KEYS.customerID))}
        className="line-clamp-2 max-w-[200px] px-4 hover:underline hover:underline-offset-2"
      >
        {row.getValue(COLUMN_ACCESSOR_KEYS.customerName)}
      </Link>
    ),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.funding,
    accessorFn: (row) => formatMoney(row.funding),
    header: ({ column }) => (
      <ToggleSortButton header="Funding" column={column} />
    ),
    cell: ({ row }) => (
      <span className="px-4">{row.getValue(COLUMN_ACCESSOR_KEYS.funding)}</span>
    ),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.proservice,
    accessorFn: (row) => formatMoney(row.proservice),
    header: ({ column }) => (
      <ToggleSortButton header="Proservice" column={column} />
    ),
    cell: ({ row }) => (
      <span className="px-4">
        {row.getValue(COLUMN_ACCESSOR_KEYS.proservice)}
      </span>
    ),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.credit,
    accessorFn: (row) => formatMoney(row.funding),
    header: ({ column }) => (
      <ToggleSortButton header="Credit" column={column} />
    ),
    cell: ({ row }) => (
      <span className="px-4">{row.getValue(COLUMN_ACCESSOR_KEYS.credit)}</span>
    ),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.status,
    accessorFn: (row) =>
      row.status === "proceeding" ? "In Progress" : "Completed",
    header: ({ column }) => (
      <ToggleSortButton
        header="Status"
        column={column}
        className="mx-auto flex"
      />
    ),
    cell: ({ row }) => {
      const status: Status = row.getValue(COLUMN_ACCESSOR_KEYS.status);

      return (
        <Badge
          className={`${
            row.original.status === "proceeding"
              ? "border-blue-600 bg-blue-600/15 text-blue-600"
              : "border-green-600 bg-green-600/15 text-green-600"
          }`}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: COLUMN_IDS.endDate,
    accessorKey: COLUMN_ACCESSOR_KEYS.endDate,
    accessorFn: (row) =>
      row.endDate ? format(row.endDate, "yyyy/MM/dd") : "-",
    header: ({ column }) => (
      <ToggleSortButton
        header="End Date"
        column={column}
        className="mx-auto flex"
      />
    ),
    cell: ({ row }) => (
      <div className="px-4 text-center">
        {row.getValue(COLUMN_ACCESSOR_KEYS.endDate)}
      </div>
    ),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.endYear,
    accessorFn: (row) => (row.endDate ? String(getYear(row.endDate)) : "-"),
    enableHiding: true,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.endQuarter,
    accessorFn: (row) =>
      row.endDate ? String(Math.floor(getMonth(row.endDate) / 3) + 1) : "-",
    enableHiding: true,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.endMonth,
    accessorFn: (row) =>
      row.endDate ? String(getMonth(row.endDate) + 1) : "-",
    enableHiding: true,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.win,
    accessorFn: (row) => (row.win ? "Yes" : "No"),
    header: ({ column }) => (
      <ToggleSortButton header="Win" column={column} className="mx-auto flex" />
    ),
    cell: ({ row }) => {
      const win: string = row.getValue(COLUMN_ACCESSOR_KEYS.win);

      return (
        <Badge
          className={`${
            row.original.win
              ? "border-green-600 bg-green-600/15 text-green-600"
              : "border-red-600 bg-red-600/15 text-red-600"
          }`}
        >
          {win}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(String(row.getValue(id))),
  },
];
