import { Plus } from "lucide-react";
import ObjectiveForm from "@/components/objective-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AddButton({
  refreshTable,
}: {
  refreshTable: () => void;
}) {
  const { toast } = useToast();

  function onSubmit(data: {
    description: string;
    problem_statement: string;
    team: string;
    assigned_to: string;
  }) {
    fetch("/api/objectives", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        toast({
          title: "Success",
          description: "Objective added successfully",
          action: (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Plus className="h-5 w-5 text-green-600" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add objective. Please try again.",
          variant: "destructive",
        });
      }
      refreshTable();
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Objective
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl"> 
        <DialogHeader>
          <DialogTitle>Add Objective</DialogTitle>
          <DialogDescription>
            &quot;If you set a crazy, ambitious goal and miss it, you&apos;ll
            still achieve something remarkable.&quot; - Larry Page
          </DialogDescription>
        </DialogHeader>
        <ObjectiveForm onSubmit={onSubmit} refreshTable={refreshTable} />
      </DialogContent>
    </Dialog>
  );
}