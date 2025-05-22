"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { fetchHandler } from "@/api/fetch";
import ROUTES from "@/constants/routes";
import { TAGS } from "@/constants/tags";
import { CustomerData } from "@/validation";

import { createAuthHeader } from "../auth-header";
import { API_BASE_URL } from "../url";

export const createCustomer = async (data: CustomerData) => {
  const response = await fetchHandler(`${API_BASE_URL}/customers`, {
    method: "POST",
    headers: {
      Authorization: await createAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (response.success) {
    revalidateTag(TAGS.customers);

    const data = response.data as CreateCustomerResponseData;
    redirect(ROUTES.customer(data.id));
  }

  return response;
};
