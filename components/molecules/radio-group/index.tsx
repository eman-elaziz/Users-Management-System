import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";
import { RadioButton } from "@/components/atoms/radio";

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function RadioGroup({
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  className,
}: RadioGroupProps) {
  const labelId = React.useId();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Group Label */}
      <p id={labelId} className="text-base font-semibold text-neutral-900">
        {label}
      </p>

      {/* Radio Options */}
      <RadioGroupPrimitive
        aria-labelledby={labelId}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className="flex flex-col gap-3"
      >
        {options.map((option) => {
          const optionId = `${labelId}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex items-center gap-3",
                option.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer",
              )}
            >
              <RadioButton
                id={optionId}
                value={option.value}
                disabled={option.disabled}
              />

              <span className="text-base text-neutral-900">{option.label}</span>
            </label>
          );
        })}
      </RadioGroupPrimitive>
    </div>
  );
}

export { RadioGroup };
