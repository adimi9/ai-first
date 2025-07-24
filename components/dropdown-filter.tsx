import { Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Props {
  variableName: string;
  filteredValues: string[];
  values: string[];
  onChange: (selectedValues: string[]) => void;
}

export default function DropdownFilter({
  variableName,
  filteredValues,
  values,
  onChange,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded-full"
          variant={filteredValues.length > 0 ? "default" : "outline"}
        >
          <Filter />
          {filteredValues.length == 1 ? filteredValues[0] : variableName}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto cursor-pointer p-1 text-sm">
        <div
          className="mr-2 flex items-center gap-2 rounded-sm p-1.5 hover:bg-muted"
          onClick={() => onChange([])}
        >
          Select All
          {filteredValues.length == 0 ? (
            <Check className="ml-auto size-4" />
          ) : (
            ""
          )}
        </div>

        <Separator />
        <ScrollArea className={values.length > 4 ? "h-36" : ""}>
          {values.map((value) => (
            <div
              key={value}
              className="mr-2 flex items-center gap-2 rounded-sm p-1.5 hover:bg-muted"
              onClick={() => {
                const index = filteredValues.indexOf(value);
                if (index == -1) {
                  onChange([...filteredValues, value]);
                } else {
                  onChange(filteredValues.filter((item) => item != value));
                }
              }}
            >
              {value}
              {filteredValues.includes(value) ? (
                <Check className="ml-auto size-4" />
              ) : (
                ""
              )}
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
