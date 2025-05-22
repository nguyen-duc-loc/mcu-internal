import { IconCloudComputingFilled } from "@tabler/icons-react";
import { Metadata } from "next";
import React from "react";

import Heading from "@/components/heading";

import Table from "./_components/table";

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage customers",
};

const CustomersPage = () => {
  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <Heading heading="Customers Data" Icon={IconCloudComputingFilled} />
      <Table />
    </div>
  );
};

export default CustomersPage;
