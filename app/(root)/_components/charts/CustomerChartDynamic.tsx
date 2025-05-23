"use client";

import dynamic from "next/dynamic";
import React from "react";

interface CustomerChartDynamicProps {
  customers: Customer[];
}

const CustomerChart = dynamic(() => import("./CustomerChart"), {
  ssr: false,
});

const CustomerChartDynamic = ({ customers }: CustomerChartDynamicProps) => {
  return <CustomerChart customers={customers} />;
};

export default CustomerChartDynamic;
