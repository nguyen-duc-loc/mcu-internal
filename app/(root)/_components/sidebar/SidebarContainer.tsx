"use client";

import {
  IconSettings,
  IconUserFilled,
  IconUser,
  IconLogout2,
  IconSettingsFilled,
  IconLayoutDashboard,
  IconLayoutDashboardFilled,
  IconCloudComputing,
  IconCloudComputingFilled,
  IconSquareRoundedPlus,
  IconSquareRoundedPlusFilled,
  IconHexagonPlusFilled,
  IconHexagonPlus,
} from "@tabler/icons-react";
import React from "react";

import ROUTES from "@/constants/routes";
import { SidebarProvider } from "@/contexts/sidebar";

import Logo from "./Logo";
import SidebarBody from "./SidebarBody";
import SidebarLink, { Links } from "./SidebarLink";
import SidebarUser from "./SidebarUser";

interface SidebarContainerProps {
  animate?: boolean;
  me: User;
}

const SidebarContainer = ({ animate, me }: SidebarContainerProps) => {
  const [open, setOpen] = React.useState(false);

  let links: Links[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: ROUTES.dashboard,
      icon: IconLayoutDashboard,
      iconFilled: IconLayoutDashboardFilled,
    },
  ];

  if (me.role !== "viewer") {
    links = links.concat({
      id: "newCustomer",
      label: "Create customer",
      href: ROUTES.newCustomer,
      icon: IconSquareRoundedPlus,
      iconFilled: IconSquareRoundedPlusFilled,
    });
  }

  links = links.concat({
    id: "customers",
    label: "Customers Data",
    href: ROUTES.customers,
    icon: IconCloudComputing,
    iconFilled: IconCloudComputingFilled,
  });

  if (me.role === "admin") {
    links = links.concat(
      {
        id: "users",
        label: "User management",
        href: ROUTES.users,
        icon: IconUser,
        iconFilled: IconUserFilled,
      },
      {
        id: "newUser",
        label: "Create user",
        href: ROUTES.newUser,
        icon: IconHexagonPlus,
        iconFilled: IconHexagonPlusFilled,
      }
    );
  }
  links = links.concat(
    {
      id: "settings",
      label: "Settings",
      href: ROUTES.settings,
      icon: IconSettings,
      iconFilled: IconSettingsFilled,
    },
    {
      id: "logout",
      label: "Logout",
      href: "#",
      icon: IconLogout2,
    }
  );

  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      <SidebarBody className="justify-between gap-10 border-r xl:sticky xl:top-0">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Logo />
          <div className="mt-12 flex flex-col gap-2">
            {links.map((link) => (
              <SidebarLink key={link.id} link={link} />
            ))}
          </div>
        </div>
        <SidebarUser me={me} />
      </SidebarBody>
    </SidebarProvider>
  );
};

export default SidebarContainer;
