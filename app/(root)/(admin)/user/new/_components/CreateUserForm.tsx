"use client";

import React from "react";

import UserForm from "@/components/forms/UserForm";
import { createUser } from "@/lib/api/actions/users";
import { UserData, UserSchema } from "@/validation";

const CreateUserForm = () => {
  return (
    <UserForm
      formType="CREATE"
      schema={UserSchema}
      defaultValues={
        {
          fullName: "",
          email: "",
          password: "",
          role: "viewer",
        } as UserData
      }
      onSubmit={(data) => createUser(data)}
    />
  );
};

export default CreateUserForm;
