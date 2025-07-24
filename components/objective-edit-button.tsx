import { Edit } from "lucide-react";
import { Objective } from "@/types";
import ObjectiveForm from "@/components/objective-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface ObjectiveEditButtonProps {
  objective: Objective;
  onSubmit: () => void;
}

export default function ObjectiveEditButton({
  objective,
  onSubmit,
}: ObjectiveEditButtonProps) {
  const { toast } = useToast();
  function updateObjective(data: {
    description: string;
    team: string;
    assigned_to: string;
  }) {
    fetch(`/api/objectives/${objective.objective_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        toast({
          title: "Success",
          description: "Objective edited successfully",
          action: (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Edit className="h-5 w-5 text-green-600" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to edit objective. Please try again.",
          variant: "destructive",
        });
      }
      onSubmit();
    });
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Edit />
          Edit Objective
        </Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-md lg:max-w-lg">
        <SheetTitle>Edit Objective</SheetTitle>
        <SheetDescription>
          &quot;If you set a crazy, ambitious goal and miss it, you&apos;ll
          still achieve something remarkable.&quot; - Larry Page
        </SheetDescription>
        <ObjectiveForm
          onSubmit={updateObjective}
          defaultObjective={objective}
          refreshTable={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
}
