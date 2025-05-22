"use server";

import { fetchHandler } from "@/api/fetch";
import { TAGS } from "@/constants/tags";

import { API_BASE_URL } from "../url";

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