"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { fetchHandler } from "@/api/fetch";
import ROUTES from "@/constants/routes";
import { TAGS } from "@/constants/tags";
import { UserData } from "@/validation";

import { createAuthHeader } from "../auth-header";
import { API_BASE_URL } from "../url";

export const createUser = async (data: UserData) => {
  const response = await fetchHandler(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: await createAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (response.success) {
    revalidateTag(TAGS.users);

    const data = response.data as CreateUserResponseData;
    redirect(ROUTES.user(data.id));
  }

  return response;
};
