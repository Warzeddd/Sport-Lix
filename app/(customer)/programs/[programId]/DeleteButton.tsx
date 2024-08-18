"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Définir le type des props, y compris la fonction deleteAction
export type DeleteButtonProps = {
  id: string;
  deleteAction: (id: string) => Promise<{ data?: any; serverError?: string }>;
};

export const DeleteButton = ({ id, deleteAction }: DeleteButtonProps) => {
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: () => deleteAction(id),
    onSuccess: ({ data, serverError }) => {
      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success("Program deleted");

      router.push("/dashboard");
      router.refresh();
    },
  });

  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        if (isConfirming) {
          deleteMutation.mutate();
        } else {
          setIsConfirming(true);
        }
      }}
    >
      {deleteMutation.isPending && <Loader2 className="size-4 animate-spin" />}
      {isConfirming ? "Are you sure?" : "Delete"}
    </Button>
  );
};
