"use client";

import { format, getMonth, getYear } from "date-fns";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

interface RevenueChartProps {
  customers: Customer[];
}

const chartConfig = {
  revenue: {
    label: "Revenue ($)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const RevenueChart = ({ customers }: RevenueChartProps) => {
  const today = new Date();
  const intervalMonths = 6;
  // Total revenue for the last ${intervalMonths} months
  const chartData = Array.from({ length: intervalMonths }).map((_, idx) => {
    const date = new Date(
      getYear(today),
      getMonth(today) - (intervalMonths - 1 - idx),
      1
    );

    return {
      year: format(date, "yyyy"),
      month: format(date, "MMM"),
      revenue: customers.reduce(
        (prevCustomers, { funding, proservice, endDate }) => {
          const customerEndDate = endDate ? new Date(endDate) : undefined;

          return customerEndDate &&
            getYear(date) === getYear(customerEndDate) &&
            getMonth(date) === getMonth(customerEndDate)
            ? prevCustomers + funding + proservice
            : prevCustomers;
        },
        0
      ),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Revenue</CardTitle>
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
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="w-[200px]" />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{
                fill: "var(--primary)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm leading-none text-muted-foreground">
        Showing total revenue for the last 6 months
      </CardFooter>
    </Card>
  );
};

export default RevenueChart;
