"use client";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { priorities, statuses, teams } from "@/constants";
import { Objective } from "@/types";
import { ObjectiveCard } from "@/components/objective-card";
import AddButton from "@/components/objective-add-button";
import DropdownFilter from "@/components/dropdown-filter";
import { Input } from "@/components/ui/input";

export function OkrTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Objective[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [teamFilter, setTeamFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  function filtersApplied() {
    return (
      searchTerm !== "" ||
      teamFilter.length > 0 ||
      priorityFilter.length > 0 ||
      statusFilter.length > 0
    );
  }

  function clearFilters() {
    setSearchTerm("");
    setTeamFilter([]);
    setPriorityFilter([]);
    setStatusFilter([]);
  }

  const refreshTable = useCallback(() => {
    let url = "/api/objectives?";
    if (searchTerm !== "") {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }
    teamFilter.forEach((team) => {
      url += `&team=${encodeURIComponent(team)}`;
    });
    priorityFilter.forEach((priority) => {
      url += `&priority=${encodeURIComponent(priority)}`;
    });
    statusFilter.forEach((status) => {
      url += `&status=${encodeURIComponent(status)}`;
    });

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [priorityFilter, searchTerm, statusFilter, teamFilter]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="sticky top-0 bg-white py-4 pt-2 md:flex">
        <div className="mr-auto gap-4 md:flex">
          <Input
            className="w-96"
            placeholder="Search for objective keywords e.g. risk management"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <DropdownFilter
            variableName="Team"
            values={teams}
            filteredValues={teamFilter}
            onChange={setTeamFilter}
          />
          <DropdownFilter
            variableName="Priority"
            values={priorities}
            filteredValues={priorityFilter}
            onChange={setPriorityFilter}
          />
          <DropdownFilter
            variableName="Status"
            values={statuses}
            filteredValues={statusFilter}
            onChange={setStatusFilter}
          />
          {filtersApplied() ? (
            <div
              className="flex cursor-pointer items-center justify-center rounded-sm hover:bg-muted"
              onClick={clearFilters}
            >
              <X className="mr-1 size-4" />
              Reset
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mr-4">
          <AddButton refreshTable={refreshTable} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((objective) => (
            <ObjectiveCard
              key={objective.objective_id}
              objective={objective}
              refreshTable={refreshTable}
              priorityFilter={priorityFilter}
              statusFilter={statusFilter}
            />
          ))
        ) : (
          <p>No OKRs found.</p>
        )}
      </div>
    </div>
  );
}
