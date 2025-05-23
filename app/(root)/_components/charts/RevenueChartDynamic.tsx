"use client";

import dynamic from "next/dynamic";
import React from "react";

interface RevenueChartDynamicProps {
  customers: Customer[];
}

const RevenueChart = dynamic(() => import("./RevenueChart"), {
  ssr: false,
});

const RevenueChartDynamic = ({ customers }: RevenueChartDynamicProps) => {
  return <RevenueChart customers={customers} />;
};

export default RevenueChartDynamic;
