import { IconUserFilled } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import React from "react";

import Heading from "@/components/heading";
import { createAuthHeader } from "@/lib/api/auth-header";
import { getUserById } from "@/lib/api/data/users";

import UserInfo from "./_components/UserInfo";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  await connection();
  const user = await getUserById(id, await createAuthHeader());
  if (user === null) {
    return {
      title: "User not found",
      description: "User not found",
    };
  }

  return {
    title: user.fullName,
    description: user.fullName,
  };
};

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUserById(id, await createAuthHeader());
  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <Heading heading={user.fullName} Icon={IconUserFilled} />
      <UserInfo user={user} />
    </div>
  );
};

export default UserPage;
