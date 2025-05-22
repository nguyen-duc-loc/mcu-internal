"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { fetchHandler } from "@/api/fetch";
import ROUTES from "@/constants/routes";
import { TAGS } from "@/constants/tags";
import {
  UpdatePasswordData,
  UpdateUserInformationData,
  UserData,
} from "@/validation";

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

export const updateRoleById = async (userId: string, role: Role) => {
  const response = await fetchHandler(`${API_BASE_URL}/users/${userId}/role`, {
    method: "PUT",
    headers: {
      Authorization: await createAuthHeader(),
    },
    body: JSON.stringify({ role }),
  });

  if (response.success) {
    revalidateTag(TAGS.users);
  }

  return response;
};

export const deleteUserById = async (userId: string) => {
  const response = await fetchHandler(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: await createAuthHeader(),
    },
  });

  if (response.success) {
    revalidateTag(TAGS.users);
    redirect(ROUTES.users);
  }

  return response;
};

export const updateMe = async (data: UpdateUserInformationData) => {
  const response = await fetchHandler(`${API_BASE_URL}/me`, {
    method: "PUT",
    headers: {
      Authorization: await createAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (response.success) {
    revalidateTag(TAGS.users);
  }

  return response;
};

export const updatePassword = async (data: UpdatePasswordData) => {
  const response = await fetchHandler(`${API_BASE_URL}/me/password`, {
    method: "PUT",
    headers: {
      Authorization: await createAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  return response;
};
