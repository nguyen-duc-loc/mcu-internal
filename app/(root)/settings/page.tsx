import { Metadata } from "next";
import React from "react";

import { Separator } from "@/components/ui/separator";

import AccountSettings from "./_components/AccountSettings";
import AppearanceSettings from "./_components/AppearanceSettings";
import InformationSettings from "./_components/InformationSettings";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings account and appearance",
};

const availableTabs: SettingsTab[] = ["information", "account", "appearance"];

const mappingTab: {
  // eslint-disable-next-line no-unused-vars
  [key in SettingsTab]: {
    description: string;
    Component: React.ReactNode;
  };
} = {
  information: {
    description: "This is how admin will see you on the site.",
    Component: <InformationSettings />,
  },
  account: {
    description: "Update your account settings. Set your password.",
    Component: <AccountSettings />,
  },
  appearance: {
    description:
      "Customize the appearance of the app. Automatically switch between day and night themes.",
    Component: <AppearanceSettings />,
  },
};

const SettingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { tab = "" } = await searchParams;
  const defaultTab: SettingsTab = "information";
  const currentTab = availableTabs.includes(tab as SettingsTab)
    ? (tab as SettingsTab)
    : defaultTab;

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set appearance
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col gap-4 lg:flex-row">
        <Sidebar currentTab={currentTab} availableTabs={availableTabs} />
        <div className="grow basis-2/3 space-y-6">
          <div>
            <h3 className="text-lg font-semibold capitalize">{currentTab}</h3>
            <p className="text-sm text-muted-foreground">
              {mappingTab[currentTab].description}
            </p>
          </div>
          <Separator className="w-11/12" />
          {mappingTab[currentTab].Component}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
