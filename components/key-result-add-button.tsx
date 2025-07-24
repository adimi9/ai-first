import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import KeyResultForm from "@/components/key-result-form";
import { useToast } from "@/hooks/use-toast";

export default function KeyResultAddButton({
  objective_id,
  refreshTable,
}: {
  objective_id: number;
  refreshTable: () => void;
}) {
  const { toast } = useToast();
  function onSubmit(data: {
    description: string;
    priority: string;
    status: string;
    progress: number;
    target_date: string;
  }) {
    const keyResult = {
      ...data,
      objective_id,
    };
    fetch("/api/key_results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyResult),
    }).then((res) => {
      if (res.status == 200) {
        toast({
          title: "Success",
          description: "Key result added successfully",
          action: (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Plus className="h-5 w-5 text-green-600" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add key result. Please try again.",
          variant: "destructive",
        });
      }
      refreshTable();
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-36">
          <Plus />
          Add Key Result
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle>Add Key Result</DialogTitle>
          <DialogDescription>
            &quot;It&apos;s not a key result unless it has a number.&quot; -
            Marissa Mayer
          </DialogDescription>
        </DialogHeader>
        <KeyResultForm onSubmit={onSubmit} refreshTable={refreshTable} />
      </DialogContent>
    </Dialog>
  );
}
