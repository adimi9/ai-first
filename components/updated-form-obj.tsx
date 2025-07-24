import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Assuming 'teams' might still be used elsewhere or not strictly needed here
// import { teams } from "@/constants";

import { Objective } from "@/types"; // Keep this import for defaultObjective type

import DeleteButton from "@/components/deleteButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SheetClose } from "@/components/ui/sheet";

// **MODIFIED:** Simplified formSchema to only include 'description'
const formSchema = z.object({
  description: z.string().min(1, "Description cannot be empty."), // Added a simple validation
});

// **IMPORTANT:** Ensure your Objective type (from "@/types") looks like this
// for the defaultObjective prop to be correctly handled:
// interface Objective {
//   objective_id: string; // The ID used for API calls
//   description: string;
//   // Other properties of Objective not directly in this formSchema
//   // e.g., problem_statement, team, assigned_to, title, keyResults, overallProgress,
//   // progress, created_at, last_updatedts
// }


interface Props {
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
  defaultObjective?: Objective;
  refreshTable: () => void; // Used for triggering refresh after delete
}

export default function ObjectiveForm({
  onSubmit,
  defaultObjective,
  refreshTable,
}: Props) {
  // **MODIFIED:** defaultValues now only initializes 'description'
  const defaultValues = defaultObjective
    ? {
        description: defaultObjective.description,
        // Removed problem_statement, team, assigned_to
      }
    : {
        description: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5" // Adjusted gap if needed
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="grow">Description</FormLabel>
                {/* The "Need Help? askBERNARD" button is now in the SheetTitle, not here */}
                {/* You can remove this Link/Button block if it's strictly not part of the form body */}
                {/* <Button type="button" variant="outline" asChild>
                  <Link
                    href="https://aibots.gov.sg/chats/askbernard"
                    target="_blank"
                  >
                    Need Help? askBERNARD <Sparkles />
                  </Link>
                </Button> */}
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Is your objective BIG - Bold, Inspiring and Goal oriented?"
                  className="h-24"
                />
              </FormControl>
              {form.formState.errors.description && ( // Display error message
                <p className="text-red-500 text-sm">
                  {form.formState.errors.description.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/* **REMOVED:** FormField for problem_statement */}
        {/* **REMOVED:** FormField for team */}
        {/* **REMOVED:** FormField for assigned_to */}

        <div className="mt-5 flex justify-start gap-2"> {/* **MODIFIED:** justify-start to align buttons left */}
          {defaultObjective ? (
            <SheetClose asChild>
              <Button type="submit">Save Changes</Button> {/* Moved Save Changes button here */}
            </SheetClose>
          ) : (
             <SheetClose asChild> {/* If adding a new objective, also allow saving */}
                <Button type="submit">Create Objective</Button>
            </SheetClose>
          )}
          {defaultObjective ? (
            <SheetClose asChild>
              <DeleteButton
                id={defaultObjective.objective_id}
                type="objectives" // Ensure this 'type' matches your API endpoint
                refreshTable={refreshTable}
              />
            </SheetClose>
          ) : (
            ""
          )}
        </div>
      </form>
    </Form>
  );
}