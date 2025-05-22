import { IconUserFilled } from "@tabler/icons-react";
import { forbidden } from "next/navigation";
import React from "react";

import { createAuthHeader } from "@/lib/api/auth-header";
import { getMe } from "@/lib/api/data/users";

import UsersTable from "./_components/table";

export const generateMetadata = () => {
  return {
    title: "User management",
    description: "User management",
  };
};

const UsersPage = async () => {
  const me = await getMe(await createAuthHeader());
  if (me.role !== "admin") {
    forbidden();
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <IconUserFilled className="size-7" />
        User management
      </h1>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
