import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KeyResultSortSelectProps {
  sortColumns: string[];
  value: string;
  setSortColumn: (sortColumn: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (sortDirection: "asc" | "desc") => void;
}

export function KeyResultSortSelect({
  sortColumns,
  value,
  setSortColumn,
  sortDirection,
  setSortDirection,
}: KeyResultSortSelectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="" asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowUpDown />
          Sort: {value}
          <span className="ml-auto text-lg">
            {sortDirection === "asc" ? "↓" : "↑"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sortColumns.map((columnName) => (
          <DropdownMenuItem
            key={columnName}
            onClick={() => {
              if (columnName === value) {
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              }
              setSortColumn(columnName);
            }}
          >
            {columnName}
            {columnName === value && (
              <span className="ml-auto text-lg">
                {sortDirection === "asc" ? "↓" : "↑"}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
