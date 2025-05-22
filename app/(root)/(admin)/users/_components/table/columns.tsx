import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import Badge from "@/components/table/cell/Badge";
import ROUTES from "@/constants/routes";

import { COLUMN_ACCESSOR_KEYS } from "../../_constants/columnAccessorKey";
import { COLUMN_IDS } from "../../_constants/columnId";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.userFullName,
    header: () => <div className="text-center">Full Name</div>,
    cell: ({ row }) => (
      <Link
        href={ROUTES.user(row.original.id)}
        className="line-clamp-2 max-w-[400px] px-4 hover:underline hover:underline-offset-2"
      >
        {row.getValue(COLUMN_ACCESSOR_KEYS.userFullName)}
      </Link>
    ),
  },
  {
    accessorKey: COLUMN_ACCESSOR_KEYS.email,
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate px-4">
        {row.getValue(COLUMN_ACCESSOR_KEYS.email)}
      </div>
    ),
  },
  {
    id: COLUMN_IDS.role,
    accessorKey: COLUMN_ACCESSOR_KEYS.role,
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => {
      const role: Role = row.getValue(COLUMN_ACCESSOR_KEYS.role);

      return (
        <Badge
          className={`capitalize ${
            role === "admin"
              ? "border-red-600 bg-red-600/15 text-red-600"
              : role === "editor"
              ? "border-blue-600 bg-blue-600/15 text-blue-600"
              : "border-green-600 bg-green-600/15 text-green-600"
          }`}
        >
          {role}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
