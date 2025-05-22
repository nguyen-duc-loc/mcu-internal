import React from "react";

import { createAuthHeader } from "@/lib/api/auth-header";
import { getMe } from "@/lib/api/data/users";

import SidebarContainer from "./SidebarContainer";

const Sidebar = async () => {
  const me = await getMe(await createAuthHeader());

  return <SidebarContainer animate={false} me={me} />;
};

export default Sidebar;
