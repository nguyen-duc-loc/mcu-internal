import { forbidden } from "next/navigation";
import React from "react";

import { createAuthHeader } from "@/lib/api/auth-header";
import { getMe } from "@/lib/api/data/users";

const ExceptViewerLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const me = await getMe(await createAuthHeader());
  if (me.role === "viewer") {
    forbidden();
  }

  return children;
};

export default ExceptViewerLayout;
