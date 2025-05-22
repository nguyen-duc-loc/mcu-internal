"use client";

import React from "react";

import CustomerForm from "@/components/forms/CustomerForm";
import { createCustomer } from "@/lib/api/actions/customers";
import { CustomerData } from "@/validation";

const CreateCustomer = () => {
  return (
    <CustomerForm
      formType="CREATE"
      defaultValues={{
        name: "",
        status: "proceeding",
        funding: 0,
        proservice: 0,
        credit: 0,
        win: true,
      }}
      onSubmit={(data: CustomerData) => createCustomer(data)}
    />
  );
};

export default CreateCustomer;
