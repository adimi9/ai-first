import { useCallback, useEffect, useState } from "react";
import { KeyResult } from "@/types";
import CommentSection from "@/components/comment-section";
import StatusBadge from "@/components/status-badge";
import KeyResultEditButton from "@/components/key-result-edit-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface KeyResultCardProps {
  keyResult: KeyResult;
  refreshTable: () => void;
}

export function KeyResultCard({ keyResult, refreshTable }: KeyResultCardProps) {
  const [dependencies, setDependencies] = useState<KeyResult[]>([]);
  const refreshDependencies = useCallback(() => {
    fetch(`/api/key_results/${keyResult.key_result_id}/dependencies`)
      .then((res) => res.json())
      .then((data) => {
        setDependencies(data);
      });
  }, [keyResult]);
  useEffect(() => {
    refreshDependencies();
  }, [refreshDependencies]);

  return (
    <div className="rounded-sm border-l-4 border-l-gray-300 bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] transition-colors hover:border-l-primary">
      <p>{keyResult.description}</p>
      <div className="mt-4 flex items-end">
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-muted-foreground">Target Date</p>
            <p>
              {new Date(keyResult.target_date).toLocaleString("en-SG", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Priority</p>
            <p>{keyResult.priority}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <StatusBadge status={keyResult.status} />
          </div>
          <div>
            <p className="text-muted-foreground">Progress</p>
            <p>{keyResult.progress}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last updated</p>
            <p>
              {new Date(keyResult.last_updated).toLocaleDateString("en-SG")}
            </p>
          </div>
          {dependencies.length > 0 && (
            <div>
              <p className="text-muted-foreground">Aligned to SCG&apos;s</p>
              <div className="flex items-center gap-2">
                {dependencies.map((dep) => (
                  <TooltipProvider key={dep.key_result_id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="size-8 rounded-full text-xs"
                          variant="outline"
                        >
                          {dep.description.slice(0, 5)}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="border bg-white text-base text-black">
                        {dep.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <KeyResultEditButton keyResult={keyResult} onSubmit={refreshTable} />
        </div>
      </div>

      <Separator className="my-4" />
      <CommentSection keyResultId={keyResult.key_result_id} />
    </div>
  );
}
