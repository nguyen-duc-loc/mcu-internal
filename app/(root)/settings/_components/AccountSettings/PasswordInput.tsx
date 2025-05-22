"use client";

import React from "react";
import { ControllerRenderProps } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { UpdatePasswordData } from "@/validation";

interface PasswordInputProps {
  field: ControllerRenderProps<
    UpdatePasswordData,
    "password" | "confirmPassword"
  >;
  disabled?: boolean;
}

const PasswordInput = ({ field, disabled }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div className="space-y-2">
      <Input
        {...field}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
      />
      <div className="flex items-center gap-2">
        <Checkbox
          id={`show-${field.name}`}
          checked={showPassword}
          onCheckedChange={() =>
            setShowPassword((showPassword) => !showPassword)
          }
          disabled={disabled}
        />
        <label htmlFor={`show-${field.name}`} className="text-sm">
          Show password
        </label>
      </div>
    </div>
  );
};

export default PasswordInput;
