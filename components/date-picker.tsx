import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  value: string;
  onChange: (event: string) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex" variant="outline">
          <CalendarIcon />
          {value
            ? new Date(value).toLocaleDateString("en-SG", {
                year: "numeric",
                month: "short",
              })
            : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={(day, selected_day) => onChange(selected_day.toISOString())}
          fixedWeeks
        />
      </PopoverContent>
    </Popover>
  );
}
