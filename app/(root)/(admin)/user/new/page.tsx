import { IconHexagonPlusFilled } from "@tabler/icons-react";
import { Metadata } from "next";
import React from "react";

import Heading from "@/components/heading";

import CreateUserForm from "./_components/CreateUserForm";

export const metadata: Metadata = {
  title: "Create user",
  description: "Create a new user",
};

const CreateNewCustomerPage = () => {
  return (
    <div className="mx-auto max-w-[900px]">
      <Heading heading="Create a new user" Icon={IconHexagonPlusFilled} />
      <CreateUserForm />
    </div>
  );
};

export default CreateNewCustomerPage;
