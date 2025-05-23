"use client";

import numeral from "numeral";
import React from "react";
import CountUp from "react-countup";

const ValueCountUp = ({
  value,
  prefix,
  suffix,
  decimal,
}: {
  value: string | number;
  prefix?: string;
  suffix?: string;
  decimal?: boolean;
}) => {
  return (
    <CountUp
      end={Number(value)}
      formattingFn={(number) =>
        `${prefix ? prefix + " " : ""}${
          number >= 1_000_000
            ? decimal
              ? numeral(number).format("0,0.00a")
              : numeral(number).format("0,0a")
            : decimal
            ? numeral(number).format("0,0.00")
            : numeral(number).format("0,0")
        }${suffix || ""}`
      }
      className="grow pl-10 text-2xl font-bold uppercase tracking-tight"
    />
  );
};

export default ValueCountUp;
