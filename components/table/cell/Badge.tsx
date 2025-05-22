import React from "react";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

const Badge = ({ className, children }: BadgeProps) => {
  return (
    <div
      className={`mx-auto w-fit rounded-lg border px-3 py-1 text-center text-xs ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;
