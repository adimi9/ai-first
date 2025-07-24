import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement>(null);
  const combinedRef = (node: HTMLTextAreaElement) => {
    if (typeof ref === "function") ref(node);
    else if (ref)
      (ref as React.RefObject<HTMLTextAreaElement | null>).current = node;
    innerRef.current = node;
  };

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.height = "auto";
      innerRef.current.style.height = `${innerRef.current.scrollHeight + 4}px`;
    }
  }, [props.value]);

  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={combinedRef}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
