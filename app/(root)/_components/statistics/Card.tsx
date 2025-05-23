import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import ValueCountUp from "./ValueCountUp";

interface CardStatisticsProps {
  name: string;
  Icon: React.ComponentType<{ className: string }>;
  iconClassName?: string;
  value: string | number;
  valuePrefix?: string;
  valueSuffix?: string;
  decimal?: boolean;
}

const CardStatistics = ({
  name,
  Icon,
  iconClassName,
  value,
  valuePrefix,
  valueSuffix,
  decimal,
}: CardStatisticsProps) => {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-base font-normal capitalize tracking-normal text-muted-foreground">
          <Icon
            className={cn("rounded-full p-2 size-10 border", iconClassName)}
          />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6 text-2xl font-semibold tracking-wide xl:text-3xl">
        <ValueCountUp
          value={value}
          prefix={valuePrefix}
          suffix={valueSuffix}
          decimal={decimal}
        />
      </CardContent>
    </Card>
  );
};

export default CardStatistics;
