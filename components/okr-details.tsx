"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  ChevronRight,
  Pen,
  X,
  ArrowLeft,
  // icons for sort button:
  ArrowUpDown,
} from "lucide-react";
import EditKeyResultModal from "./edit-key-result-modal";
import EditObjectiveModal from "@/components/edit-objective-modal";
import AddButton from "@/components/beta-objective-add-button";
import KeyResultAddButton from "@/components/key-result-add-button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  // new import for sort dropdown items
  DropdownMenuItem, 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Interface for a Key Result (as defined in edit-key-result-modal.tsx and used internally)
interface KeyResult {
  id: string;
  description: string;
  priority: 'High Priority' | 'Low Priority';
  targetDate: string;
  quarter?: string;
  status: string;
  lastUpdated: string;
  progress: number;
}

// Interface for a simplified Key Result reference (as expected by EditObjectiveModal)
interface ObjectiveKeyResultReference {
  id: string;
  description: string;
}

// Interface for an Objective (as received from API and used internally by OKRDetail)
interface ObjectiveForOKRDetail {
  id: string;
  title: string;
  description: string;
  overallProgress: number;
  keyResults: KeyResult[];
}

// Interface for an Objective (as expected by EditObjectiveModal)
// This MUST match the definition in edit-objective-modal.tsx
interface ObjectiveForEditModal {
  id: string;
  title: string;
  description: string;
  overallProgress: number; // This property is present in EditObjectiveModal's Objective, so keep it.
  keyResults: ObjectiveKeyResultReference[]; // This is the key difference
}

// Props for the OKRDetail component
interface OKRDetailProps {
  divisionName?: string;
}

// Define types for sorting state
type SortKey = 'description' | 'progress' | 'lastUpdated';
type SortDirection = 'ascending' | 'descending';

// This function now returns a hex color string for progress
const progressColor = (p: number) =>
  p >= 60 ? "#069c56" : p >= 30 ? "#ff681e" : "#cc3336"; // Green, Orange, Red

// MODIFIED: getStatusPillClasses to return inline style object
const getStatusPillStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "not started":
      return { backgroundColor: "#cc3336", color: "white" }; // Red
    case "on hold":
    case "onhold":
      return { backgroundColor: "#ff681e", color: "white" }; // Orange
    case "on track":
      return { backgroundColor: "#069c56", color: "white" }; // Green
    default:
      return { backgroundColor: "#A0AEC0", color: "white" }; // Gray for unknown status
  }
};

// MODIFIED: getPriorityPillClasses to return inline style object
const getPriorityPillStyles = (priority: string) => {
  const normalizedPriority = priority.toLowerCase().replace(" priority", "");
  switch (normalizedPriority) {
    case "high":
      return { backgroundColor: "#cc3336", color: "white" }; // Red
    case "low":
      return { backgroundColor: "#ff681e", color: "white" }; // Orange
    default:
      return { backgroundColor: "#A0AEC0", color: "white" }; // Gray for unknown priority
  }
};

export default function OKRDetail({ divisionName }: OKRDetailProps) {
  const [objectives, setObjectives] = useState<ObjectiveForOKRDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedObjectives, setExpandedObjectives] = useState<string[]>([]);
  const [isEditKeyResultModalOpen, setIsEditKeyResultModalOpen] =
    useState(false);
  const [selectedKeyResult, setSelectedKeyResult] =
    useState<KeyResult | null>(null);
  const [isEditObjectiveModalOpen, setIsEditObjectiveModalOpen] =
    useState(false);
  const [selectedObjective, setSelectedObjective] = useState<ObjectiveForEditModal | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedQuarters, setSelectedQuarters] = useState<string[]>([]);

  // state to manage sorting of key results table
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey; 
    direction: SortDirection;
  }>({
    key: 'progress', 
    direction: 'descending', 
  }); 

  const currentDivision = divisionName || " ";

  // Modified formatQuarter to use financial year logic
  const formatQuarter = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed (0 = January, 11 = December)

    let quarter = "";
    let financialYear = year;

    if (month >= 3 && month <= 5) { // April, May, June
      quarter = "Q1";
    } else if (month >= 6 && month <= 8) { // July, August, September
      quarter = "Q2";
    } else if (month >= 9 && month <= 11) { // October, November, December
      quarter = "Q3";
    } else { // January, February, March
      quarter = "Q4";
      financialYear = year - 1; // Q4 of the previous financial year
    }
    return `FY${String(financialYear).slice(-2)} ${quarter}`; // e.g., FY25 Q1
  };

  const fetchDivisionObjectives = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("Attempting to fetch objectives for division:", currentDivision);
    try {
      const res = await fetch(
        `/api/division-data?name=${encodeURIComponent(currentDivision)}`
      );
      if (!res.ok) {
        let errorDetails = `Status: ${res.status}`;
        try {
          const err = await res.json();
          errorDetails += `, Message: ${err.error || JSON.stringify(err)}`;
        } catch (jsonError) {
          console.error("Error parsing JSON error response:", jsonError);
          const textError = await res.text();
          errorDetails += `, Response: ${textError.substring(0, 200)}...`;
        }
        throw new Error(`Failed to fetch division data. ${errorDetails}`);
      }
      const data: ObjectiveForOKRDetail[] = await res.json();

      const transformedData = data.map((obj) => ({
        ...obj,
        keyResults: obj.keyResults.map((kr) => ({
          ...kr,
          quarter: formatQuarter(kr.targetDate),
        })),
      }));
      setObjectives(transformedData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error fetching division objectives:", e);
        setError(e.message);
      } else {
        console.error("Error fetching division objectives: An unknown error occurred", e);
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [currentDivision, setLoading, setError, setObjectives]);

  useEffect(() => {
    fetchDivisionObjectives();
  }, [currentDivision, fetchDivisionObjectives]);

  const toggleObjective = (id: string) =>
    setExpandedObjectives((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleEditKeyResult = (kr: KeyResult) => {
    setSelectedKeyResult(kr);
    setIsEditKeyResultModalOpen(true);
  };
  const handleCloseKeyModal = () => {
    setIsEditKeyResultModalOpen(false);
    setSelectedKeyResult(null);
  };
  const handleSaveKeyResult = async () => {
    try {
      await fetchDivisionObjectives();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error refreshing data after key result save/delete:", e);
      } else {
        console.error("Error refreshing data after key result save/delete: An unknown error occurred", e);
      }
    } finally {
      handleCloseKeyModal();
    }
  };

  const handleEditObjective = (obj: ObjectiveForOKRDetail) => {
    const objForModal: ObjectiveForEditModal = {
      id: obj.id,
      title: obj.title,
      description: obj.description,
      overallProgress: obj.overallProgress,
      keyResults: obj.keyResults.map(kr => ({
        id: kr.id,
        description: kr.description,
      })),
    };
    setSelectedObjective(objForModal);
    setIsEditObjectiveModalOpen(true);
  };

  const handleCloseObjectiveModal = () => {
    setIsEditObjectiveModalOpen(false);
    setSelectedObjective(null);
  };

  const handleSaveObjective = (updated: ObjectiveForEditModal) => {
    const payload = {
      description: updated.description,
    };

    fetch(`/api/beta_objectives/${updated.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          let errorMessage = `Failed to update objective: Status ${res.status}`;
          const contentType = res.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            return res.json().then(errorData => {
              errorMessage = errorData.error || errorMessage;
              throw new Error(errorMessage);
            }).catch(jsonError => {
              console.error("Error parsing JSON error response:", jsonError);
              throw new Error("Failed to parse error response from server.");
            });
          } else {
            return res.text().then(textError => {
              errorMessage = textError || errorMessage;
              throw new Error(errorMessage);
            }).catch(textReadError => {
              console.error("Error reading text error response:", textReadError);
              throw new Error("Failed to read error response from server.");
            });
          }
        }
        return res;
      })
      .then(() => fetchDivisionObjectives())
      .catch((e: unknown) => {
        if (e instanceof Error) {
          console.error("Error saving objective:", e.message);
        } else {
          console.error("Error saving objective: An unknown error occurred", e);
        }
      })
      .finally(() => handleCloseObjectiveModal());
  };


  // handler to update sort configuration
  const handleSort = (key: SortKey) => {
    setSortConfig((prevConfig) => {
      // If same key, toggle direction. Otherwise, set new key and default to ascending.
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return { key, direction: 'ascending' };
    });
  }

  const uniqueQuarters = useMemo(() => {
    const quarters = new Set<string>();
    objectives.forEach((obj) => {
      obj.keyResults.forEach((kr) => {
        if (kr.quarter) {
          quarters.add(kr.quarter);
        }
      });
    });
    return Array.from(quarters).sort();
  }, [objectives]);

  const handleQuarterToggle = (quarter: string) => {
    setSelectedQuarters((prev) =>
      prev.includes(quarter)
        ? prev.filter((q) => q !== quarter)
        : [...prev, quarter]
    );
  };

  const filteredObjectives = objectives
    .map((obj) => {
      const filteredKeyResults = obj.keyResults.filter((kr) => {
        const matchesSearch =
          searchQuery === "" ||
          kr.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesQuarter =
          selectedQuarters.length === 0 ||
          (kr.quarter && selectedQuarters.includes(kr.quarter));

        return matchesSearch && matchesQuarter;
      });

      const objectiveMatchesSearch =
        searchQuery === "" ||
        obj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.description.toLowerCase().includes(searchQuery.toLowerCase());

      const shouldIncludeObjective =
        filteredKeyResults.length > 0 ||
        (objectiveMatchesSearch && selectedQuarters.length === 0);

      return shouldIncludeObjective
        ? { ...obj, keyResults: filteredKeyResults }
        : null;
    })
    .filter(Boolean) as ObjectiveForOKRDetail[];

  if (loading)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        Loading objectives for {currentDivision}…
      </div>
    );
  if (error)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-red-600">
        Error: {error}
      </div>
    );
  if (!filteredObjectives.length && (searchQuery !== "" || selectedQuarters.length > 0))
    return (
      <div className="p-6 text-center text-gray-500">
        No objectives or key results found matching your filters.
      </div>
    );
  if (!objectives.length && searchQuery === "" && selectedQuarters.length === 0)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-500">
        No objectives found for {currentDivision}.
      </div>
    );

  return (
  <div className="px-8 min-h-screen font-sans py-6">
    {/* ---------- Page Header ---------- */}
    <div className="mb-6 flex items-center gap-4">
      <Button asChild variant="outline" size="lg" className="px-5 py-2.5">
        <Link href="/beta">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back</span>
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold text-gray-900">{currentDivision}</h1>
    </div>

    {/* ---------- Filter/Search/Add Section ---------- */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <AddButton refreshTable={fetchDivisionObjectives} />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-3 py-2 border border-gray-300 rounded text-sm w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4 text-gray-700" />
              Filter FY Quarters
              {selectedQuarters.length > 0 && (
                <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {selectedQuarters.length}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-gray-700 rotate-90" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white shadow-lg rounded-md border border-gray-200">
            <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700">
              Filter by FY Quarter
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-t border-gray-200" />
            {uniqueQuarters.length > 0 ? (
              uniqueQuarters.map((quarter) => (
                <DropdownMenuCheckboxItem
                  key={quarter}
                  checked={selectedQuarters.includes(quarter)}
                  onCheckedChange={() => handleQuarterToggle(quarter)}
                  onSelect={(e) => e.preventDefault()}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer data-[state=checked]:pl-6"
                >
                  {quarter}
                </DropdownMenuCheckboxItem>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No quarters available
              </div>
            )}
            {selectedQuarters.length > 0 && (
              <>
                <DropdownMenuSeparator className="border-t border-gray-200" />
                <DropdownMenuCheckboxItem
                  checked={false}
                  onCheckedChange={() => setSelectedQuarters([])}
                  onSelect={(e) => e.preventDefault()}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <X className="w-4 h-4 mr-2" /> Clear Filters
                </DropdownMenuCheckboxItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

      {/* ---------- Objectives ---------- */}
      <div className="space-y-6">
        {filteredObjectives.length === 0 &&
        (searchQuery !== "" || selectedQuarters.length > 0) ? (
          <div className="p-6 text-center text-gray-500">
            No objectives or key results found matching your filters.
          </div>
        ) : (
          filteredObjectives.map((obj) => {
            const expanded = expandedObjectives.includes(obj.id);
            
            // NEW: Sorting logic applied here, before rendering the table
            const sortedKeyResults = [...obj.keyResults].sort((a, b) => {
              const { key, direction } = sortConfig;
              
              // Get the values to compare
              let valA: string | number = a[key];
              let valB: string | number = b[key];
              
              // Handle date sorting by converting to YYYY-MM-DD string for date-only comparison
              if (key === 'lastUpdated') {
                  valA = new Date(valA).toISOString().split('T')[0];
                  valB = new Date(valB).toISOString().split('T')[0];
              }

              // Determine sort order
              let comparison = 0;
              if (valA > valB) {
                comparison = 1;
              } else if (valA < valB) {
                comparison = -1;
              }

              return direction === 'descending' ? comparison * -1 : comparison;
            });
            
            // NEW: Labels for the sort button
            const sortLabels: Record<SortKey, string> = {
                description: 'Alphabetical',
                progress: 'Progress',
                lastUpdated: 'Last updated'
            };


            return (
              <div key={obj.id}>
                <div className="flex items-center gap-2 ml-1 mb-1">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {obj.title}
                  </h1>
                  <div
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 cursor-pointer translate-y-px"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditObjective(obj);
                    }}
                  >
                    <Pen className="w-3 h-3 text-white" />
                  </div>
                </div>

              <Card className="bg-white border border-gray-300 shadow-md rounded-lg relative">
                <div className="absolute left-0 top-0 bottom-0 w-2.5  bg-[#78B9D4] rounded-l-lg" />

                <CardContent className="p-0">
                  <div
                    className="flex items-start justify-between p-4 pb-1 cursor-pointer" // Changed pb-3 to pb-1
                    onClick={() => toggleObjective(obj.id)}
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <ChevronRight
                        className={`w-4 h-4 mt-1 text-gray-500 transition-transform ${
                          expanded ? "rotate-90" : ""
                        }`}
                      />
                      <p className="text-gray-700 leading-snug text-sm">
                        {obj.description}
                      </p>
                    </div>

                        <div className="text-right ml-6 flex-shrink-0">
                          {/* Combined label and percentage onto one line using flexbox */}
                          <div className="flex flex-col items-end justify-center h-full"> 
                            <span className="text-xs text-gray-600 whitespace-nowrap">
                              Overall Progress:
                            </span>
                            <span
                              className="text-lg font-bold"
                              style={{ color: progressColor(obj.overallProgress) }}
                            >
                              {obj.overallProgress}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {expanded && (
                        <div className="px-4 pt-1 pb-2"> {/* Changed pt-3 to pt-1 */}
                          {/* NEW: Sorting Dropdown Menu */}
                          <div className="flex justify-start mb-2"> 
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="outline" className="flex items-center gap-2 h-9 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                                          <ArrowUpDown className="size-4 shrink-0" />
                                          Sort: {sortLabels[sortConfig.key]}
                                          {sortConfig.direction === 'ascending' ? (
                                              <span className="ml-auto text-lg">↑</span>
                                          ) : (
                                              <span className="ml-auto text-lg">↓</span>
                                          )}
                                      </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="start">
                                      <DropdownMenuItem onSelect={() => handleSort('description')}>
                                          Alphabetical
                                          {sortConfig.key === 'description' && <span className="ml-auto">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onSelect={() => handleSort('progress')}>
                                          Progress
                                          {sortConfig.key === 'progress' && <span className="ml-auto">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onSelect={() => handleSort('lastUpdated')}>
                                          Last updated
                                          {sortConfig.key === 'lastUpdated' && <span className="ml-auto">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>}
                                      </DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </div>
                          {obj.keyResults.length > 0 ? (
                            <table className="min-w-full table-fixed border border-gray-300">
                              <thead>
                                <tr>
                                  <th className="px-3 py-2 text-sm text-center font-bold uppercase tracking-wider bg-gray-50 text-gray-800 border border-gray-300 w-[40%]">Key Result</th>
                                  <th className="px-3 py-2 text-sm text-center font-bold uppercase tracking-wider bg-gray-50 text-gray-800 border border-gray-300 w-[10%]">Priority</th>
                                  <th className="px-3 py-2 text-sm text-center font-bold uppercase tracking-wider bg-gray-50 text-gray-800 border border-gray-300 w-[12%]">Target Date</th>
                                  <th className="px-3 py-2 text-sm text-center font-bold uppercase tracking-wider bg-gray-50 text-gray-800 border border-gray-300 w-[13%]">Status</th>
                                  <th className="px-3 py-2 text-sm text-center font-bold uppercase tracking-wider bg-gray-50 text-gray-800 border border-gray-300 w-[13%]">Last Updated</th>
                                  <th colSpan={2} className="px-3 py-2 text-sm text-center font-bold uppercase tracking-wider bg-gray-50 text-gray-800 border border-gray-300 w-[18%]">Progress</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-300">
                                {/* CHANGED: Map over the new sortedKeyResults array */}
                                {sortedKeyResults.map((kr) => (
                                    <tr key={kr.id}>
                                        <td className="px-3 py-2 text-sm text-gray-700 text-left align-middle border border-gray-300">
                                            {kr.description}
                                        </td>
                                        <td className="px-3 py-2 text-sm text-center align-middle border border-gray-300">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full" style={getPriorityPillStyles(kr.priority)}>
                                                {kr.priority.replace(" Priority", "")}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-sm text-gray-700 text-center align-middle border border-gray-300">
                                            <div>{formatDate(kr.targetDate)}</div>
                                            {kr.quarter && <div className="text-xs text-gray-500">({kr.quarter})</div>}
                                        </td>
                                        <td className="px-3 py-2 text-sm text-center align-middle border border-gray-300">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full" style={getStatusPillStyles(kr.status)}>
                                                {kr.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-sm text-gray-700 text-center align-middle border border-gray-300">
                                            {formatDate(kr.lastUpdated)}
                                        </td>
                                        <td className="px-3 py-2 w-7 text-sm text-gray-700 text-center align-middle border border-gray-300">
                                            <span style={{ color: progressColor(kr.progress) }}>
                                                {kr.progress}%
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-sm text-gray-700 text-center align-middle border border-gray-300">
                                            <div
                                                className="w-6 h-6 mx-auto flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditKeyResult(kr);
                                                }}
                                            >
                                                <Pen className="w-3.5 h-3.5 text-white" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="p-3 text-center text-gray-500 text-sm">
                              No key results for this objective match the current
                              filters.
                            </div>
                          )}
                          <div className="py-3 pl-3">
                            <KeyResultAddButton
                              objective_id={Number(obj.id)}
                              refreshTable={fetchDivisionObjectives}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })
          )}
      </div>

    {/* ---------- Modals ---------- */}
    <EditKeyResultModal
      isOpen={isEditKeyResultModalOpen}
      onClose={handleCloseKeyModal}
      keyResult={selectedKeyResult}
      onSave={handleSaveKeyResult}
    />
    <EditObjectiveModal
      isOpen={isEditObjectiveModalOpen}
      onClose={handleCloseObjectiveModal}
      objective={selectedObjective}
      onSave={handleSaveObjective}
    />
  </div>
);
}
