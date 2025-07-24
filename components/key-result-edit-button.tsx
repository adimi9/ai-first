import { Edit } from "lucide-react";
import { KeyResult } from "@/types";
import KeyResultForm from "@/components/key-result-form";
import { KeyResultDependencySection } from "@/components/key-result-dependency-section";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface KeyResultEditButtonProps {
  keyResult: KeyResult;
  onSubmit: () => void;
}

export default function KeyResultEditButton({
  keyResult,
  onSubmit,
}: KeyResultEditButtonProps) {
  const { toast } = useToast();
  function updateKeyResult(data: {
    description: string;
    priority: string;
    status: string;
    target_date: string;
  }) {
    fetch(`/api/key_results/${keyResult.key_result_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        toast({
          title: "Success",
          description: "Key result edited successfully",
          action: (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Edit className="h-5 w-5 text-green-600" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to edit key result. Please try again.",
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
          Edit Key Result
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll md:max-w-md lg:max-w-lg">
        <SheetHeader className="mb-6">
          <SheetTitle>Edit Key Result</SheetTitle>
          <SheetDescription>
            &quot;It&apos;s not a key result unless it has a number.&quot; -
            Marissa Mayer
          </SheetDescription>
        </SheetHeader>
        <KeyResultForm
          onSubmit={updateKeyResult}
          defaultKeyResult={keyResult}
          refreshTable={onSubmit}
        />
        <KeyResultDependencySection keyResultId={keyResult.key_result_id} />
      </SheetContent>
    </Sheet>
  );
}
