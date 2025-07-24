import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";

import { teams } from "@/constants";
import { Objective } from "@/types";

import DeleteButton from "@/components/deleteButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose } from "@/components/ui/sheet";

const formSchema = z.object({
  description: z.string(),
  problem_statement: z.string(),
  team: z.string(),
  assigned_to: z.string(),
});

interface Props {
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
  defaultObjective?: Objective;
  refreshTable: () => void;
}

export default function ObjectiveForm({
  onSubmit,
  defaultObjective,
  refreshTable,
}: Props) {
  const defaultValues = defaultObjective
    ? {
        description: defaultObjective.description,
        problem_statement: defaultObjective.problem_statement,
        team: defaultObjective.team,
        assigned_to: defaultObjective.assigned_to,
      }
    : {
        description: "",
        problem_statement: "",
        team: "",
        assigned_to: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="grow">Description</FormLabel>
                <Button type="button" variant="outline" asChild>
                  <Link
                    href="https://aibots.gov.sg/chats/askbernard"
                    target="_blank"
                  >
                    Need Help? askBERNARD <Sparkles />
                  </Link>
                </Button>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Is your objective BIG - Bold, Inspiring and Goal oriented?"
                  className="h-24"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="problem_statement"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="grow">Problem Statement</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-24" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assigned_to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-5 flex justify-end gap-2">
          {defaultObjective ? (
            <SheetClose asChild>
              <DeleteButton
                id={defaultObjective.objective_id}
                type="objectives"
                refreshTable={refreshTable}
              />
            </SheetClose>
          ) : (
            ""
          )}
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </div>
      </form>
    </Form>
  );
}
