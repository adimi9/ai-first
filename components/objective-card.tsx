import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { KeyResult, Objective } from "@/types";
import ObjectiveEditButton from "@/components/objective-edit-button";
import { KeyResultCard } from "@/components/key-result-card";
import { KeyResultSortSelect } from "@/components/key-result-sort-select";
import KeyResultAddButton from "@/components/key-result-add-button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const keyResultsSortColumns = ["Alphabetical", "Progress", "Last updated"];
const sortColumnMap: Record<string, string> = {
  Alphabetical: "description",
  Progress: "progress",
  "Last updated": "last_updated",
};

interface ObjectiveCardProps {
  objective: Objective;
  refreshTable: () => void;
  priorityFilter: string[];
  statusFilter: string[];
}

export function ObjectiveCard({
  objective,
  refreshTable,
  priorityFilter,
  statusFilter,
}: ObjectiveCardProps) {
  const [keyResultsExpanded, setKeyResultsExpanded] = useState(false);
  const [keyResultsSortBy, setKeyResultsSortBy] = useState(
    keyResultsSortColumns[0],
  );
  const [keyResultsSortDirection, setKeyResultsSortDirection] = useState<
    "asc" | "desc"
  >("asc");
  const [keyResultsLoading, setKeyResultsLoading] = useState(true);
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);
  const [numHidden, setNumHidden] = useState(0);

  const refreshKeyResults = useCallback(() => {
    let url = `/api/objectives/${objective.objective_id}/key_results`;
    url += `?sortBy=${sortColumnMap[keyResultsSortBy]}`;
    url += `&sortDirection=${keyResultsSortDirection}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const filteredKeyResults = data.filter((kr: KeyResult) => {
          const matchesPriority =
            priorityFilter.length === 0 || priorityFilter.includes(kr.priority);
          const matchesStatus =
            statusFilter.length === 0 || statusFilter.includes(kr.status);
          return matchesPriority && matchesStatus;
        });
        setNumHidden(data.length - filteredKeyResults.length);
        setKeyResults(filteredKeyResults);
        setKeyResultsLoading(false);
      });
  }, [
    keyResultsSortBy,
    keyResultsSortDirection,
    objective.objective_id,
    priorityFilter,
    statusFilter,
  ]);

  useEffect(() => {
    if (keyResultsExpanded) {
      refreshKeyResults();
    }
  }, [keyResultsExpanded, refreshKeyResults]);

  return (
    <div className="rounded-sm border-l-4 border-l-gray-300 bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] transition-colors hover:border-l-primary">
      <p>{objective.description}</p>
      <div className="mt-4 flex items-end">
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-muted-foreground">Team</p>
            <p>{objective.team}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Owner</p>
            <p>{objective.assigned_to}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Progress</p>
            <p>{objective.progress}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Updated</p>
            <p>
              {new Date(objective.last_updated).toLocaleDateString("en-SG")}
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ObjectiveEditButton objective={objective} onSubmit={refreshTable} />
        </div>
      </div>

      <Collapsible
        open={keyResultsExpanded}
        onOpenChange={setKeyResultsExpanded}
      >
        <CollapsibleTrigger className="mt-4 flex items-center justify-between">
          <span className="font-medium">View Key Results</span>
          <ChevronDown
            className={`size-6 shrink-0 transition-transform duration-200 ${keyResultsExpanded ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 bg-muted p-4">
            <div className="mr-4 flex items-center">
              <div className="grow">
                <KeyResultSortSelect
                  sortColumns={keyResultsSortColumns}
                  value={keyResultsSortBy}
                  setSortColumn={setKeyResultsSortBy}
                  sortDirection={keyResultsSortDirection}
                  setSortDirection={setKeyResultsSortDirection}
                />
              </div>
              <KeyResultAddButton
                objective_id={objective.objective_id}
                refreshTable={refreshKeyResults}
              />
            </div>
            {keyResultsLoading ? (
              <p className="mt-4 text-muted-foreground">
                Loading key results...
              </p>
            ) : keyResults.length > 0 ? (
              <div className="mt-4 flex flex-col gap-4">
                {keyResults.map((keyResult) => (
                  <KeyResultCard
                    key={keyResult.key_result_id}
                    keyResult={keyResult}
                    refreshTable={refreshKeyResults}
                  />
                ))}
                {numHidden > 0
                  ? `${numHidden} key results were not shown due to filters`
                  : null}
              </div>
            ) : (
              <p className="mt-4 text-muted-foreground">
                No key results yet. Add one to get started!
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
