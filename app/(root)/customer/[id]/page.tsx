import { IconCloudComputingFilled } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import React from "react";

import Heading from "@/components/heading";
import { createAuthHeader } from "@/lib/api/auth-header";
import { getCustomerById } from "@/lib/api/data/customers";

import CustomerInfo from "./_components/CustomerInfo";

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
    description: customer.name,
  };
};

const CustomerPage = async ({
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
    <div className="mx-auto max-w-[800px]">
      <Heading heading={customer.name} Icon={IconCloudComputingFilled} />
      <CustomerInfo customer={customer} />
    </div>
  );
};

export default CustomerPage;
