import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stepConnectorVariants = cva("h-1 flex-1", {
  variants: {
    status: {
      default: "bg-neutral-200",
      completed: "bg-primary-600",
    },
  },

  defaultVariants: {
    status: "default",
  },
});

interface StepConnectorProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepConnectorVariants> {}

function StepConnector({ className, status, ...props }: StepConnectorProps) {
  return (
    <div
      data-slot="step-connector"
      aria-hidden="true"
      className={cn(stepConnectorVariants({ status }), className)}
      {...props}
    />
  );
}

export { StepConnector, stepConnectorVariants };
