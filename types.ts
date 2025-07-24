export type Priority = "High Priority" | "Low Priority";
export type Status =
  | "Not Started"
  | "On Track"
  | "At Risk"
  | "Delayed"
  | "Completed"
  | "On Hold";

export interface Objective {
  objective_id: number;
  team: string;
  assigned_to: string;
  description: string;
  problem_statement: string;
  progress: number;
  created_at: string;
  last_updated: string;
}

export interface KeyResult {
  key_result_id: number;
  objective_id: number;
  description: string;
  priority: Priority;
  status: Status;
  progress: number;
  target_date: string;
  created_at: string;
  last_updated: string;
}

export interface message {
  role: string;
  content: string;
  tool_call_id?: string;
}
