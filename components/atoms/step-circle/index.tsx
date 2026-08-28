import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stepCircleVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-medium",
  {
    variants: {
      status: {
        default: "bg-neutral-200 text-neutral-600",

        active: "bg-primary-600 text-white",

        completed: "bg-primary-600 text-white",

        disabled: "bg-neutral-100 text-neutral-300",
      },

      size: {
        sm: "size-8 text-sm",

        default: "size-12 text-base",

        lg: "size-14 text-lg",
      },
    },

    defaultVariants: {
      status: "default",
      size: "default",
    },
  },
);

interface StepCircleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepCircleVariants> {
  step?: number;
}

function StepCircle({
  className,
  status,
  size,
  step,
  ...props
}: StepCircleProps) {
  return (
    <div
      data-slot="step-circle"
      className={cn(
        stepCircleVariants({
          status,
          size,
        }),
        className,
      )}
      {...props}
    >
      {status === "completed" ? <Check aria-hidden="true" /> : step}
    </div>
  );
}

export { StepCircle, stepCircleVariants };
