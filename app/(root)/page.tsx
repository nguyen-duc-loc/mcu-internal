import { IconLayoutDashboardFilled } from "@tabler/icons-react";
import React from "react";

import Heading from "@/components/heading";
import { createAuthHeader } from "@/lib/api/auth-header";
import { getAllCustomers } from "@/lib/api/data/customers";
import { getMe } from "@/lib/api/data/users";

import Charts from "./_components/charts";
import Statistics from "./_components/statistics";

const DashboardPage = async () => {
  const authHeader = await createAuthHeader();
  const [me, customers] = await Promise.all([
    getMe(authHeader),
    getAllCustomers(authHeader),
  ]);

  return (
    <div className="space-y-6">
      <Heading
        heading={`Welcome, ${me.fullName}`}
        Icon={IconLayoutDashboardFilled}
      />
      <Statistics customers={customers} />
      <Charts customers={customers} />
    </div>
  );
};

export default DashboardPage;
