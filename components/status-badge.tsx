import { Badge } from "@/components/ui/badge";
import { Status } from "@/types";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  TriangleAlert,
  CirclePause,
} from "lucide-react";

export default function StatusBadge({ status }: { status: Status }) {
  switch (status) {
    case "Not Started":
      return (
        <Badge className="flex items-center gap-1 bg-gray-100 text-gray-800 hover:bg-gray-100">
          <XCircle className="h-3.5 w-3.5" />
          <span>Not Started</span>
        </Badge>
      );
    case "On Track":
      return (
        <Badge className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-100">
          <Clock className="h-3.5 w-3.5" />
          <span>On Track</span>
        </Badge>
      );
    case "At Risk":
      return (
        <Badge className="flex items-center gap-1 bg-amber-100 text-amber-800 hover:bg-amber-100">
          <TriangleAlert className="h-3.5 w-3.5" />
          <span>At Risk</span>
        </Badge>
      );
    case "Delayed":
      return (
        <Badge className="flex items-center gap-1 bg-red-100 text-red-800 hover:bg-red-100">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Delayed</span>
        </Badge>
      );
    case "Completed":
      return (
        <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Completed</span>
        </Badge>
      );
    case "On Hold":
      return (
        <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
          <CirclePause className="h-3.5 w-3.5" />
          <span>On Hold</span>
        </Badge>
      );
    default:
      return null;
  }
}
