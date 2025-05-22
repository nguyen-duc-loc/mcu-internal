"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus } from "lucide-react";
import React from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { roleOptions } from "@/validation";

interface UserFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse<unknown>>;
  formType: "CREATE" | "UPDATE";
}

const UserForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  formType,
}: UserFormProps<T>) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleSubmit = async (data: T) => {
    const response = await onSubmit(data);
    if (!response.success) {
      toast.error(response.error?.message);
    } else {
      toast.success(
        `${
          formType[0].toUpperCase() + formType.slice(1).toLowerCase()
        }d customer successfully`
      );
      if (formType === "CREATE") {
        form.reset();
      }
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto flex max-w-[500px] flex-col gap-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {field.name} <span className="text-primary">*</span>
                </FormLabel>
                {field.name === "role" ? (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 w-32 capitalize">
                        <SelectValue
                          placeholder={field.value}
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="space-y-2">
                    <FormControl>
                      <Input
                        type={
                          field.name === "password" && !showPassword
                            ? "password"
                            : "text"
                        }
                        {...field}
                        className="h-10"
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
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={isSubmitting}
          className={`w-fit ${formType === "CREATE" && "ml-auto"}`}
        >
          {isSubmitting ? (
            <Spinner />
          ) : formType === "CREATE" ? (
            <Plus />
          ) : (
            <Check />
          )}
          {formType[0].toUpperCase() + formType.slice(1).toLowerCase()}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
