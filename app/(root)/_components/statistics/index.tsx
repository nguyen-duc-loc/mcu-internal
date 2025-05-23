import { IconCloudComputing } from "@tabler/icons-react";
import { CircleDollarSign, Timer, Trophy } from "lucide-react";
import React from "react";

import CardStatistics from "./Card";

interface StatisticsProps {
  customers: Customer[];
}

const Statistics = async ({ customers }: StatisticsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatistics
        name="Total customers"
        value={customers.length}
        Icon={IconCloudComputing}
        iconClassName="text-orange-600 bg-orange-600/15"
      />
      <CardStatistics
        name="Total revenue"
        value={customers.reduce(
          (prevRevenue, customer) =>
            prevRevenue + customer.funding + customer.proservice,
          0
        )}
        valuePrefix="$"
        Icon={CircleDollarSign}
        iconClassName="text-green-600 bg-green-600/15"
        decimal
      />
      <CardStatistics
        name="In progress"
        value={
          customers.filter((customer) => customer.status === "proceeding")
            .length
        }
        Icon={Timer}
        iconClassName="text-blue-600 bg-blue-600/15"
      />
      <CardStatistics
        name="Win rate"
        value={
          (customers.filter((customer) => customer.win).length * 100) /
          customers.length
        }
        valueSuffix="%"
        Icon={Trophy}
        iconClassName="text-yellow-600 bg-yellow-600/15"
        decimal
      />
    </div>
  );
};

export default Statistics;
