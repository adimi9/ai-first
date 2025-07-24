import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";

import { priorities, statuses } from "@/constants";
import { KeyResult } from "@/types";

import DatePicker from "@/components/date-picker";
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
  priority: z.string(),
  status: z.string(),
  progress: z.number().min(0).max(100),
  target_date: z.string(),
});

interface Props {
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
  defaultKeyResult?: KeyResult;
  refreshTable: () => void;
}

export default function KeyResultForm({
  onSubmit,
  defaultKeyResult,
  refreshTable,
}: Props) {
  const defaultValues = defaultKeyResult
    ? {
        description: defaultKeyResult.description,
        priority: defaultKeyResult.priority,
        status: defaultKeyResult.status,
        progress: defaultKeyResult.progress,
        target_date: defaultKeyResult.target_date,
      }
    : {
        description: "",
        progress: 0,
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
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
                  placeholder="Is your key result SMART - specific, measurable, ambitious, relevant, and time-bound?"
                  className="h-24"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the priority of this KR." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What is the status of this KR." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="progress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => {
                    field.onChange(
                      +event.target.value ||
                        (event.target.value === "" ? 0 : field.value),
                    );
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Achieve By</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-5 flex justify-end gap-2">
          {defaultKeyResult ? (
            <SheetClose asChild>
              <DeleteButton
                id={defaultKeyResult.key_result_id}
                type="key_results"
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
