"use server";

import { fetchHandler } from "@/api/fetch";
import { TAGS } from "@/constants/tags";

import { API_BASE_URL } from "../url";

export const getAllUsers = async (authHeader: string) => {
  const response = await fetchHandler(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: authHeader,
    },
    next: {
      tags: [TAGS.users],
    },
  });

  return response.data as GetAllUsersResponseData;
};

export const getUserById = async (userId: string, authHeader: string) => {
  const response = await fetchHandler(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: authHeader,
    },
    next: {
      tags: [TAGS.users],
    },
  });

  return (response.data || null) as GetUserByIdResponseData;
};

export const getMe = async (authHeader: string) => {
  const response = await fetchHandler(`${API_BASE_URL}/me`, {
    headers: {
      Authorization: authHeader,
    },
    next: {
      tags: [TAGS.users],
    },
  });

  return response.data as User;
};
