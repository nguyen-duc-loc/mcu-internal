"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Path, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import { updatePassword } from "@/lib/api/actions/users";
import { UpdatePasswordData, UpdatePasswordSchema } from "@/validation";

import PasswordInput from "./PasswordInput";

const AccountSettings = () => {
  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const form = useForm<UpdatePasswordData>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });

  const handleSubmit = async (data: UpdatePasswordData) => {
    const response = await updatePassword(data);
    if (!response.success) {
      toast.error(response.error?.message);
    } else {
      toast.success("Updated password successfully");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<UpdatePasswordData>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {field.name === "password" ? "Password" : "Confirm password"}{" "}
                  <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput field={field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Change password
        </Button>
      </form>
    </Form>
  );
};

export default AccountSettings;
