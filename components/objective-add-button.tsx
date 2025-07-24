// import { useCallback, useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

import { Plus } from "lucide-react";
// import { teams } from "@/constants";
import ObjectiveForm from "@/components/objective-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// const formSchema = z.object({
//   description: z.string(),
//   problem_statement: z.string(),
//   team: z.string(),
//   assigned_to: z.string(),
// });

export default function AddButton({
  refreshTable,
}: {
  refreshTable: () => void;
}) {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     description: "",
  //     problem_statement: "",
  //     team: "",
  //     assigned_to: "",
  //   },
  // });
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);

  // const loadSuggestions = useCallback(() => {
  //   setLoading(true);
  //   fetch("/api/ai/suggest/objective", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       description: form.getValues("description"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSuggestions(data);
  //       setLoading(false);
  //     });
  // }, [form]);

  const { toast } = useToast();

  function onSubmit(data: {
    description: string;
    problem_statement: string;
    team: string;
    assigned_to: string;
  }) {
    fetch("/api/objectives", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        toast({
          title: "Success",
          description: "Objective added successfully",
          action: (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Plus className="h-5 w-5 text-green-600" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add objective. Please try again.",
          variant: "destructive",
        });
      }
      refreshTable();
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Objective
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Objective</DialogTitle>
          <DialogDescription>
            &quot;If you set a crazy, ambitious goal and miss it, you&apos;ll
            still achieve something remarkable.&quot; - Larry Page
          </DialogDescription>
        </DialogHeader>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {page === 1 && (
              <div>
                <h3 className="font-medium"></h3>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe what you want to achieve</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Is your objective BIG - Bold, Inspiring and Goal oriented?"
                          {...field}
                          className="mt-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    className="mt-4"
                    disabled={!form.watch("description")?.trim()}
                    onClick={() => {
                      loadSuggestions();
                      setPage(2);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {page === 2 && (
              <div>
                <h3 className="font-medium"></h3>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enhance your objective</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Choose from the suggestions below or refine your objective further"
                          {...field}
                          className="mt-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {loading ? (
                  <p className="text-muted-foreground">
                    Loading suggestions...
                  </p>
                ) : (
                  <div className="mt-2">
                    <p className="text-muted-foreground">
                      Here are some suggestions
                    </p>
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="cursor-pointer rounded p-2 hover:bg-gray-100"
                        onClick={() => form.setValue("description", suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    className="mt-4"
                    disabled={!form.watch("description")?.trim()}
                    onClick={() => setPage(3)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {page === 3 && (
              <div>
                <h3 className="font-medium">Who owns this objective?</h3>
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
                <div className="flex justify-end">
                  <DialogClose asChild>
                    <Button className="mt-4" type="submit">
                      Submit
                    </Button>
                  </DialogClose>
                </div>
              </div>
            )}
          </form>
        </Form> */}
        <ObjectiveForm onSubmit={onSubmit} refreshTable={refreshTable} />
      </DialogContent>
    </Dialog>
  );
}
