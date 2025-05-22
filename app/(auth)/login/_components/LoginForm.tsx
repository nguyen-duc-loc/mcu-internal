"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { login } from "@/lib/api/actions/auth";
import { LoginData, LoginSchema } from "@/validation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const defaultValues: LoginData = {
    email: "",
    password: "",
  };

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultValues as DefaultValues<LoginData>,
  });

  const onLogin = async (data: LoginData) => {
    const response = await login(data);
    if (!response.success) {
      toast.error(response.error?.message);
    } else {
      form.reset();
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="max-sm:px-8 w-102">
        <Card className="max-w-md">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="!mt-0">
              Enter your credentials below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {Object.keys(defaultValues).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<LoginData>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{field.name}</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input
                          type={
                            field.name === "password" && !showPassword
                              ? "password"
                              : "text"
                          }
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      {field.name === "password" && (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="show-password"
                            checked={showPassword}
                            onCheckedChange={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                            disabled={isSubmitting}
                          />
                          <label htmlFor="show-password" className="text-sm">
                            Show password
                          </label>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              Login
            </Button>
            <p className="flex flex-wrap items-center gap-1 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="mailto:nguyenducloc404@gmail.com"
                className="flex p-0 font-bold text-primary"
              >
                Contact admin <IconArrowNarrowRight className="size-5" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginForm;
