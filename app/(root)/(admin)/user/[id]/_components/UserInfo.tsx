"use client";

import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { deleteUserById, updateRoleById } from "@/lib/api/actions/users";
import { roleOptions } from "@/validation";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const { id, fullName, email, role } = user;
  const [updatingRole, startUpdatingRole] = React.useTransition();
  const [deletingUser, startDeletingUser] = React.useTransition();

  const handleChangeRole = (role: Role) => {
    startUpdatingRole(async () => {
      const result = await updateRoleById(id, role);
      if (!result.success) {
        toast.error(`Failed to update. Try again later.`);
        return;
      }

      toast.success("Updated role successfully!");
    });
  };

  const handleDeleteUser = () => {
    startDeletingUser(async () => {
      const result = await deleteUserById(id);
      if (!result.success) {
        toast.error(`Failed to delete. Try again later.`);
        return;
      }

      toast.success("Deleted successfully!");
    });
  };

  return (
    <div className="mx-auto max-w-[600px] space-y-6">
      <div className="truncate">
        <span className="mr-3 font-semibold">Name:</span>
        {fullName}
      </div>
      <div className="truncate">
        <span className="mr-3 font-semibold">Email:</span>
        {email}
      </div>
      <div className="flex items-center gap-3">
        <span className="mr-3 font-semibold">Role:</span>
        <Select
          onValueChange={handleChangeRole}
          defaultValue={role}
          disabled={updatingRole || deletingUser}
        >
          <SelectTrigger className="w-32 capitalize">
            <SelectValue placeholder={role} defaultValue={role} />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="destructive"
        disabled={updatingRole || deletingUser}
        onClick={handleDeleteUser}
      >
        {deletingUser ? <Spinner /> : <IconTrash />}
        Delete
      </Button>
    </div>
  );
};

export default UserInfo;
