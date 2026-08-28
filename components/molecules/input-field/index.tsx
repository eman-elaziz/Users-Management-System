import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/icon";
import { Input } from "@/components/atoms/input";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  icon?: LucideIcon;
  hint?: string;
}

function InputField({
  label,
  helperText,
  error,
  icon,
  id,
  className,
  hint,
  ...props
}: InputFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex w-full flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={inputId}
        className={cn(
          "text-sm font-semibold",
          error ? "text-destructive" : "text-neutral-900",
        )}
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        {icon && (
          <Icon
            icon={icon}
            size="lg"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        )}

        <Input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-description`
                : undefined
          }
          className={cn(
            icon && "pl-11",
            error && "border-destructive focus:border-destructive",
            className,
          )}
          {...props}
        />
      </div>

      {/* Helper / Error message */}
      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-description`} className="text-sm text-neutral-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export { InputField };
