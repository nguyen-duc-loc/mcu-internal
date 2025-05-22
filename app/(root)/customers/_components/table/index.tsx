import React from "react";

import { createAuthHeader } from "@/lib/api/auth-header";
import { getAllCustomers } from "@/lib/api/data/customers";

import CustomersDataTable from "./DataTable";

const CustomersTable = async () => {
  const data = await getAllCustomers(await createAuthHeader());

  return <CustomersDataTable data={data} />;
};

export default CustomersTable;
