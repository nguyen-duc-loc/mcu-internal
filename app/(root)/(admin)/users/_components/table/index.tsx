import React from "react";

import { createAuthHeader } from "@/lib/api/auth-header";
import { getAllUsers } from "@/lib/api/data/users";

import UsersDataTable from "./DataTable";

const UsersTable = async () => {
  const data = await getAllUsers(await createAuthHeader());

  return <UsersDataTable data={data} />;
};

export default UsersTable;
