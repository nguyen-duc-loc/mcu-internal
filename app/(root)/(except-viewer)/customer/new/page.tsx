import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { Metadata } from "next";
import React from "react";

import Heading from "@/components/heading";

import CreateCustomer from "./_components/CreateCustomer";

export const metadata: Metadata = {
  title: "Create customer",
  description: "Create a new customer",
};

const CreateNewCustomerPage = () => {
  return (
    <div className="mx-auto max-w-[900px]">
      <Heading
        heading="Create a new customer"
        Icon={IconSquareRoundedPlusFilled}
      />
      <CreateCustomer />
    </div>
  );
};

export default CreateNewCustomerPage;
