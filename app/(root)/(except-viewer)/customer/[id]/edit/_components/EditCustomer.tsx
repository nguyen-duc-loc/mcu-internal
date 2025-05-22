"use client";

import React from "react";

import CustomerForm from "@/components/forms/CustomerForm";
import { updateCustomerById } from "@/lib/api/actions/customers";
import { CustomerData } from "@/validation";

interface EditCustomerProps {
  customer: Customer;
}

const EditCustomer = ({ customer }: EditCustomerProps) => {
  const { id, name, status, funding, proservice, credit, endDate, win } =
    customer;

  return (
    <CustomerForm
      formType="UPDATE"
      defaultValues={{
        name,
        status,
        funding,
        proservice,
        credit,
        endDate,
        win,
      }}
      onSubmit={(data: CustomerData) => updateCustomerById(id, data)}
    />
  );
};

export default EditCustomer;
