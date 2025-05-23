"use client";

import { format, getMonth, getYear } from "date-fns";
import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CustomerChartProps {
  customers: Customer[];
}

const chartConfig = {
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomerChart = ({ customers }: CustomerChartProps) => {
  const today = new Date();
  const intervalMonths = 6;
  // Total customers for the last ${intervalMonths} months
  const chartData = Array.from({ length: intervalMonths }).map((_, idx) => {
    const date = new Date(
      getYear(today),
      getMonth(today) - (intervalMonths - 1 - idx),
      1
    );

    return {
      year: format(date, "yyyy"),
      month: format(date, "MMM"),
      customers: customers.reduce((prevCustomers, { endDate }) => {
        const customerEndDate = endDate ? new Date(endDate) : undefined;

        return customerEndDate &&
          getYear(date) === getYear(customerEndDate) &&
          getMonth(date) === getMonth(customerEndDate)
          ? prevCustomers + 1
          : prevCustomers;
      }, 0),
    };
  });

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Number of customers</CardTitle>
        <CardDescription>{`${chartData[0].month}${
          chartData[chartData.length - 1].year !== chartData[0].year
            ? ` ${chartData[0].year}`
            : ""
        } - ${chartData[chartData.length - 1].month} ${
          chartData[chartData.length - 1].year
        }`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="customers" fill="var(--primary)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm leading-none text-muted-foreground">
        Showing total customers for the last 6 months
      </CardFooter>
    </Card>
  );
};

export default CustomerChart;
