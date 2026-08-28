import * as React from "react";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/atoms/checkbox";

interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

function CheckboxGroup({
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  className,
}: CheckboxGroupProps) {
  const labelId = React.useId();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p id={labelId} className="text-base font-semibold text-neutral-900">
        {label}
      </p>

      <CheckboxGroupPrimitive
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
                "flex cursor-pointer items-center gap-3",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <Checkbox
                id={optionId}
                value={option.value}
                disabled={option.disabled}
              />

              <span className="text-base text-neutral-900">{option.label}</span>
            </label>
          );
        })}
      </CheckboxGroupPrimitive>
    </div>
  );
}

export { CheckboxGroup };
