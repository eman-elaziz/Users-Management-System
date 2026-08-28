import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { StepCircle } from "@/components/atoms/step-circle";

const stepItemVariants = cva("flex flex-1 flex-col items-center", {
  variants: {
    status: {
      default: "",
      active: "",
      completed: "",
      disabled: "",
    },
  },

  defaultVariants: {
    status: "default",
  },
});

interface StepItemProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepItemVariants> {
  step: number;
  label: string;
}

function StepItem({
  step,
  label,
  status = "default",
  className,
  ...props
}: StepItemProps) {
  return (
    <div
      data-slot="step-item"
      className={cn(stepItemVariants({ status }), className)}
      {...props}
    >
      <StepCircle step={step} status={status} />

      <span
        className={cn(
          "mt-3 text-sm font-semibold",
          status === "active" ? "text-primary-600" : "text-neutral-600",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export { StepItem, stepItemVariants };
