"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Props {
  id: number;
  type: "objectives" | "key_results" | "comments";
  refreshTable: () => void;
}

export default function DeleteButton({ id, type, refreshTable }: Props) {
  const { toast } = useToast();

  const deleteObjective = () => {
    fetch(`/api/${type}/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) {
        toast({
          title: "Success",
          description: `Successfully deleted ${type}`,
          action: (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Trash className="h-5 w-5 text-gray-600" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to delete ${type}. Please try again.`,
          variant: "destructive",
        });
      }
      refreshTable();
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={deleteObjective}
    >
      <Trash />
    </Button>
  );
}
