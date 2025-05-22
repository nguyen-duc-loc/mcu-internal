import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

import { useSidebar } from "@/contexts/sidebar";

const Logo = () => {
  const { setOpen } = useSidebar();

  return (
    <div
      className="z-20 flex items-center justify-between xl:justify-center"
      onClick={() => setOpen(!open)}
    >
      <Link
        href="/"
        className="flex items-center space-x-1 py-1 text-lg font-bold"
      >
        <span className="text-primary">MCU</span>
        <span>Internal</span>
        <span>System</span>
      </Link>
      <div
        className="z-50 dark:text-neutral-200 xl:hidden"
        onClick={() => setOpen(!open)}
      >
        <IconX />
      </div>
    </div>
  );
};

export default Logo;
