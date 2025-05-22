"use client";

import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { deleteCustomerById } from "@/lib/api/actions/customers";

interface DeleteCustomerBtnProps {
  customerId: string;
}

const DeleteCustomerBtn = ({ customerId }: DeleteCustomerBtnProps) => {
  const [deletingCustomer, startDeletingCustomer] = React.useTransition();

  const handleDeleteCustomer = () => {
    startDeletingCustomer(async () => {
      const result = await deleteCustomerById(customerId);
      if (!result.success) {
        toast.error(`Failed to delete. Try again later.`);
        return;
      }

      toast.success("Deleted successfully!");
    });
  };

  return (
    <Button
      variant="secondary"
      disabled={deletingCustomer}
      onClick={handleDeleteCustomer}
      className="text-red-500"
    >
      {deletingCustomer ? <Spinner /> : <IconTrash />}
      Delete
    </Button>
  );
};

export default DeleteCustomerBtn;
