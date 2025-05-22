"use client";

import React from "react";

import UserForm from "@/components/forms/UserForm";
import { updateMe } from "@/lib/api/actions/users";
import {
  UpdateUserInformationData,
  UpdateUserInformationSchema,
} from "@/validation";

interface UpdateInformationFormProps {
  me: User;
}

const UpdateInformationForm = ({ me }: UpdateInformationFormProps) => {
  const { fullName, email } = me;

  return (
    <UserForm
      formType="UPDATE"
      schema={UpdateUserInformationSchema}
      defaultValues={
        {
          fullName,
          email,
        } as UpdateUserInformationData
      }
      onSubmit={(data) => updateMe(data)}
    />
  );
};

export default UpdateInformationForm;
