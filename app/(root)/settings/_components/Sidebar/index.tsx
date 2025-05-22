"use client";

import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { removeKeysFromQuery, formUrlQuery } from "@/lib/url";

interface SidebarProps {
  currentTab: SettingsTab;
  availableTabs: SettingsTab[];
}

const Sidebar = ({ currentTab, availableTabs }: SidebarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSwitchTab(tab: SettingsTab) {
    let newUrl: string;

    if (tab === "information") {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["tab"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "tab",
        value: tab,
      });
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <nav className="flex basis-1/3 flex-wrap gap-2 lg:flex-col">
      {availableTabs.map((tab) => (
        <Button
          key={tab}
          variant={"ghost"}
          className={`group/btn grow px-8 capitalize hover:bg-transparent hover:font-semibold lg:mb-2 lg:grow-0 lg:justify-start ${
            currentTab === tab ? "font-semibold" : "font-normal"
          }`}
          onClick={() => handleSwitchTab(tab)}
        >
          <motion.span className="transition duration-150 group-hover/btn:translate-x-1">
            {tab}
          </motion.span>
        </Button>
      ))}
    </nav>
  );
};

export default Sidebar;
