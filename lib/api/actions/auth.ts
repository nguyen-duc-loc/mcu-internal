"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ROUTES from "@/constants/routes";

import { fetchHandler } from "../../../api/fetch";
import { LoginData } from "../../../validation";
import { AUTH_TOKEN_KEY } from "../../cookies";
import { API_BASE_URL } from "../url";

export const login = async (data: LoginData) => {
  const response = await fetchHandler(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.success) {
    const { token } = response.data as LoginResponseData;
    (await cookies()).set({
      name: AUTH_TOKEN_KEY,
      value: token,
      path: "/",
      httpOnly: true,
      maxAge: Number(process.env.JWT_MAX_AGE),
    });
    redirect(ROUTES.dashboard);
  }
  return response;
};

export const logout = async () => {
  (await cookies()).delete(AUTH_TOKEN_KEY);
  redirect(ROUTES.login);
};
