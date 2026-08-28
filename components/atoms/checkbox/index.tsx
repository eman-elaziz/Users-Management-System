import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-sm",
        "border border-neutral-300 bg-white",
        "outline-none transition-colors",
        "focus-visible:border-primary-600",
        "focus-visible:ring-2 focus-visible:ring-primary-600/20",
        "data-checked:border-primary-600",
        "data-checked:bg-primary-600",
        "data-disabled:cursor-not-allowed",
        "data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex size-full items-center justify-center text-white">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-3"
          aria-hidden="true"
        >
          <path d="m3 8 3 3 7-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
