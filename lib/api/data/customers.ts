"use server";

import { fetchHandler } from "@/api/fetch";
import { TAGS } from "@/constants/tags";

import { API_BASE_URL } from "../url";

export const getCustomerById = async (
  customerId: string,
  authHeader: string
) => {
  const response = await fetchHandler(
    `${API_BASE_URL}/customers/${customerId}`,
    {
      headers: {
        Authorization: authHeader,
      },
      next: {
        tags: [TAGS.customers],
      },
    }
  );

  return (response.data || null) as GetCustomerByIdResponseData;
};
