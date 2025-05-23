import React from "react";

import CustomerChart from "./CustomerChartDynamic";
import RevenueChart from "./RevenueChartDynamic";

interface ChartsProps {
  customers: Customer[];
}

const Charts = ({ customers }: ChartsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
      <CustomerChart customers={customers} />
      <RevenueChart customers={customers} />
    </div>
  );
};

export default Charts;
