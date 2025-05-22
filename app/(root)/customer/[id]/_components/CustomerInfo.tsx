import { format } from "date-fns";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

import Badge from "@/components/table/cell/Badge";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { createAuthHeader } from "@/lib/api/auth-header";
import { getMe } from "@/lib/api/data/users";
import { formatMoney } from "@/lib/utils";

import DeleteCustomerBtn from "./DeleteCustomerBtn";

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo = async ({ customer }: CustomerInfoProps) => {
  const { id, name, status, funding, proservice, credit, endDate, win } =
    customer;
  const me = await getMe(await createAuthHeader());

  return (
    <div className="mx-auto max-w-[700px] space-y-6">
      <div className="grid grid-cols-2 gap-6 max-[450px]:grid-cols-1">
        <div className="truncate">
          <span className="mr-3 font-semibold">Name:</span>
          {name}
        </div>
        <div className="flex">
          <span className="mr-3 font-semibold">Status:</span>
          {
            <Badge
              className={`!mx-0 ${
                status === "proceeding"
                  ? "border-blue-600 bg-blue-600/15 text-blue-600"
                  : "border-green-600 bg-green-600/15 text-green-600"
              }`}
            >
              {status === "proceeding" ? "In Progress" : "Completed"}
            </Badge>
          }
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-2 max-[450px]:grid-cols-1">
        <div>
          <span className="mr-3 font-semibold">Funding:</span>
          {formatMoney(funding)}
        </div>
        <div>
          <span className="mr-3 font-semibold">Proservice:</span>{" "}
          {formatMoney(proservice)}
        </div>
        <div>
          <span className="mr-3 font-semibold">Credit:</span>
          {formatMoney(credit)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 max-[450px]:grid-cols-1">
        <div>
          <span className="mr-3 font-semibold">End date:</span>
          {endDate ? format(endDate, "yyyy/MM/dd") : "-"}
        </div>
        <div className="flex">
          <span className="mr-3 font-semibold">Win:</span>
          {
            <Badge
              className={`!mx-0 ${
                win
                  ? "border-green-600 bg-green-600/15 text-green-600"
                  : "border-red-600 bg-red-600/15 text-red-600"
              }`}
            >
              {win ? "Yes" : "No"}
            </Badge>
          }
        </div>
      </div>
      {me.role !== "viewer" && (
        <div className="flex justify-between">
          <DeleteCustomerBtn customerId={id} />
          <Button asChild>
            <Link href={ROUTES.editCustomer(id)}>
              <Pencil />
              Edit
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerInfo;
