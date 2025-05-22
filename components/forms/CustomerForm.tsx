"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Check, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { CustomerData, CustomerSchema, statusOptions } from "@/validation";

interface CustomerFormProps {
  defaultValues: CustomerData;
  onSubmit: (data: CustomerData) => Promise<ActionResponse<unknown>>;
  formType: "CREATE" | "UPDATE";
}

const CustomerForm = ({
  defaultValues,
  formType,
  onSubmit,
}: CustomerFormProps) => {
  const form = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues,
  });

  const handleSubmit = async (data: CustomerData) => {
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
        className="mx-auto flex max-w-[650px] flex-col gap-6"
      >
        <div className="flex gap-6 max-[400px]:flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>
                  Customer name <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="h-10 w-32">
                      <SelectValue
                        placeholder={
                          field.value === "proceeding"
                            ? "In Progress"
                            : "Completed"
                        }
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option === "proceeding" ? "In Progress" : "Completed"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-2 max-[400px]:grid-cols-1">
          <FormField
            control={form.control}
            name="proservice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proservice ($)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="number"
                    step={0.01}
                    className="h-10"
                    {...form.register(field.name, { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="funding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding ($)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="number"
                    step={0.01}
                    className="h-10"
                    {...form.register(field.name, { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="credit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit ($)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="number"
                    step={0.01}
                    className="h-10"
                    {...form.register(field.name, { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal justify-between flex",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isSubmitting}
                      >
                        {field.value ? (
                          format(field.value, "yyyy/MM/dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(selected) => {
                        form.setValue(
                          "endDate",
                          selected ? formatISO(selected) : undefined
                        );
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                      defaultMonth={
                        field.value ? new Date(field.value) : undefined
                      }
                      fromYear={1900}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="win"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormLabel className="!mt-0">Win</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} className="ml-auto w-fit">
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

export default CustomerForm;
