import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2",
        "text-body-small text-neutral-800",
        "placeholder:text-neutral-400",
        "outline-none",
        "transition-colors",
        "focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20",
        "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400",
        "aria-invalid:border-orange-500 aria-invalid:ring-2 aria-invalid:ring-orange-500/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
