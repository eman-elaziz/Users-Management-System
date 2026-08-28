import * as React from "react";
import { Radio } from "@base-ui/react/radio";

import { cn } from "@/lib/utils";

interface RadioButtonProps extends Radio.Root.Props {
  className?: string;
}

function RadioButton({ className, children, ...props }: RadioButtonProps) {
  return (
    <Radio.Root
      data-slot="radio"
      className={cn(
        "relative size-4 shrink-0 rounded-full",
        "border border-neutral-300 bg-white",
        "outline-none transition-colors",
        "focus-visible:border-primary-600",
        "focus-visible:ring-2 focus-visible:ring-primary-600/20",
        "data-checked:border-primary-600",
        "data-disabled:cursor-not-allowed",
        "data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Radio.Indicator
        className={cn("absolute inset-1 rounded-full", "bg-primary-600")}
      />

      {children}
    </Radio.Root>
  );
}

export { RadioButton };
