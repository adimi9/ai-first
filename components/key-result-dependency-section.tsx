import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";
import { KeyResult } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function KeyResultDependencySection({
  keyResultId,
}: {
  keyResultId: number;
}) {
  const { toast } = useToast();
  const [dependencies, setDependencies] = useState<KeyResult[]>([]);
  const [filteredKeyResults, setFilteredKeyResults] = useState<KeyResult[]>([]);
  const [keyResultsExpanded, setKeyResultsExpanded] = useState(false);
  const refreshDependencies = useCallback(() => {
    fetch(`/api/key_results/${keyResultId}/dependencies`)
      .then((res) => res.json())
      .then((data) => {
        setDependencies(data);
      });
  }, [keyResultId]);
  const addDependency = useCallback(
    (dependsOnKeyResultId: number) => {
      fetch(`/api/key_results/${keyResultId}/dependencies`, {
        method: "POST",
        body: JSON.stringify({
          depends_on_key_result_id: dependsOnKeyResultId,
        }),
      }).then((res) => {
        if (res.status != 200) {
          toast({
            title: "Error",
            description: "Failed to add key result. Please try again.",
            variant: "destructive",
          });
        }

        refreshDependencies();
      });
    },
    [keyResultId, refreshDependencies, toast],
  );

  const clearDependencies = useCallback(() => {
    fetch(`/api/key_results/${keyResultId}/dependencies`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status != 200) {
        toast({
          title: "Error",
          description: "Failed to clear key results. Please try again.",
          variant: "destructive",
        });
      }
      refreshDependencies();
    });
  }, [keyResultId, refreshDependencies, toast]);

  useEffect(() => {
    refreshDependencies();
  }, [refreshDependencies]);

  useEffect(() => {
    fetch(`/api/key_results?team=SCG&sortBy=description`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredKeyResults(
          data.filter(
            (kr: KeyResult) =>
              !dependencies.some(
                (dependency: KeyResult) =>
                  dependency.key_result_id === kr.key_result_id,
              ),
          ),
        );
      });
  }, [dependencies]);

  return (
    <div>
      <h3 className="mb-2 font-semibold">Align to SCG key results</h3>
      <div className="mb-4">
        {dependencies.length == 0 ? (
          <p className="text-muted-foreground">No key results added yet</p>
        ) : (
          <Button
            onClick={clearDependencies}
            variant="link"
            className="p-0 text-muted-foreground"
          >
            Remove All
          </Button>
        )}
        {dependencies.map((dependency) => (
          <div key={dependency.key_result_id}>
            <p>{dependency.description}</p>
          </div>
        ))}
      </div>

      <Collapsible
        open={keyResultsExpanded}
        onOpenChange={setKeyResultsExpanded}
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost">
            Add Key Results
            <ChevronDown
              className={`size-6 shrink-0 transition-transform duration-200 ${keyResultsExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            {filteredKeyResults.map((keyResult) => (
              <div
                key={keyResult.key_result_id}
                className="flex cursor-pointer gap-2 rounded-lg p-2 hover:bg-muted"
                onClick={() => {
                  addDependency(keyResult.key_result_id);
                }}
              >
                <p>{keyResult.description}</p>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
