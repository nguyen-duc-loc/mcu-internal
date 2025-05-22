import { Metadata } from "next";
import React from "react";

import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to access the MCU Internal System",
};

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
