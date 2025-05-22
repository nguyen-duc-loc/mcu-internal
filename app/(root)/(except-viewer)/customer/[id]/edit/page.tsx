import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import React from "react";

import Heading from "@/components/heading";
import { createAuthHeader } from "@/lib/api/auth-header";
import { getCustomerById } from "@/lib/api/data/customers";

import EditCustomer from "./_components/EditCustomer";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  await connection();
  const customer = await getCustomerById(id, await createAuthHeader());
  if (customer === null) {
    return {
      title: "Customer not found",
      description: "Customer not found",
    };
  }

  return {
    title: customer.name,
    description: `Edit ${customer.name}`,
  };
};

const EditCustomerPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const customer = await getCustomerById(id, await createAuthHeader());
  if (!customer) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[900px]">
      <Heading heading="Edit customer" Icon={IconSquareRoundedPlusFilled} />
      <EditCustomer customer={customer} />
    </div>
  );
};

export default EditCustomerPage;
