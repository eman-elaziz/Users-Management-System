"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Loader2, Search } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface SelectOption {
  label: string;
  value: string;
  email?: string;
}

interface CustomSelectProps {
  label?: string;
  hint?: string;

  options: SelectOption[];

  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;

  placeholder?: string;

  multiple?: boolean;
  maxSelections?: number;

  searchable?: boolean;

  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onSearchChange?: (value: string) => void;

  onOpenChange?: (open: boolean) => void;

  disabled?: boolean;

  className?: string;
}

function CustomSelect({
  label,
  hint,
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  multiple = false,
  maxSelections,
  searchable = false,
  loading = false,
  hasMore = false,
  onLoadMore,
  onSearchChange,
  onOpenChange,
  disabled = false,
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }

    return typeof value === "string" && value ? [value] : [];
  }, [value, multiple]);

  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value),
  );

  const displayValue =
    selectedOptions.length > 0
      ? multiple
        ? selectedOptions.map((item) => item.label).join(", ")
        : selectedOptions[0].label
      : placeholder;

  const handleSelect = (option: SelectOption) => {
    if (multiple) {
      const exists = selectedValues.includes(option.value);

      if (exists) {
        const nextValues = selectedValues.filter(
          (item) => item !== option.value,
        );

        onValueChange?.(nextValues);
        return;
      }

      if (
        maxSelections !== undefined &&
        selectedValues.length >= maxSelections
      ) {
        return;
      }

      onValueChange?.([...selectedValues, option.value]);

      return;
    }

    onValueChange?.(option.value);
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;

    const isBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

    if (isBottom && hasMore && !loading) {
      onLoadMore?.();
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Label */}
      {label && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">{label}</label>

          {hint && (
            <span className="text-sm text-muted-foreground">({hint})</span>
          )}
        </div>
      )}

      <Popover open={open} onOpenChange={handleOpenChange}>
        {/* Trigger */}
        <PopoverTrigger
          disabled={disabled}
          className={cn(
            "flex h-14 w-full items-center justify-between",
            "rounded-xl border border-border",
            "bg-background px-5",
            "text-left text-base",
            "transition-all",
            "hover:border-primary",
            "focus-visible:border-primary",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary/20",
            "data-popup-open:border-primary",
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",
          )}
        >
          <span
            className={cn(
              "truncate",
              selectedOptions.length === 0 && "text-muted-foreground",
            )}
          >
            {displayValue}
          </span>

          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-muted-foreground",
              "transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </PopoverTrigger>

        {/* Dropdown */}
        <PopoverContent
          align="start"
          sideOffset={6}
          className={cn(
            "w-[var(--anchor-width)] min-w-[320px]",
            "overflow-hidden rounded-xl",
            "border border-border",
            "bg-background p-0",
            "shadow-lg",
          )}
        >
          <Command shouldFilter={false}>
            {/* Search */}
            {searchable && (
              <CommandInput
                placeholder="Search countries..."
                onValueChange={onSearchChange}
                className="h-12"
              />
            )}
            {/* Options */}
            <CommandList className="max-h-[320px]" onScroll={handleScroll}>
              <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
                No results found.
              </CommandEmpty>

              <CommandGroup className="p-2">
                {options.map((option, index) => {
                  const selected = selectedValues.includes(option.value);

                  const disabledOption =
                    multiple &&
                    !selected &&
                    maxSelections !== undefined &&
                    selectedValues.length >= maxSelections;

                  return (
                    <CommandItem
                      key={`${option.value}-${option.label}-${index}`}
                      value={`${option.label} ${option.email ?? ""}`}
                      disabled={disabledOption}
                      onSelect={() => handleSelect(option)}
                      className={cn(
                        "min-h-12 cursor-pointer",
                        "rounded-lg px-3",
                        "text-sm",
                        "transition-colors",

                        "data-[disabled]:pointer-events-none",
                        "data-[disabled]:opacity-50",

                        "hover:bg-muted",

                        selected && "bg-primary-50 text-primary-700",

                        selected && "hover:bg-primary-50",
                      )}
                    >
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-medium">
                          {option.label}
                        </span>

                        {option.email && (
                          <span className="truncate text-xs text-muted-foreground">
                            {option.email}
                          </span>
                        )}
                      </div>

                      {selected && (
                        <Check
                          className="ml-3 size-4 shrink-0 text-primary-600"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      )}
                    </CommandItem>
                  );
                })}

                {/* Loading */}
                {loading && (
                  <div className="flex items-center justify-center py-3">
                    <Loader2 className="size-4 animate-spin text-primary" />
                  </div>
                )}

                {/* End of pagination */}
                {!loading && options.length > 0 && !hasMore && (
                  <div className="py-2 text-center text-xs text-muted-foreground">
                    No more results
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Multiple selection info */}
      {multiple && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedValues.length}
          {maxSelections !== undefined && ` of ${maxSelections}`}
        </p>
      )}

      {/* Single selection info */}
      {!multiple && selectedOptions.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedOptions[0].label}
        </p>
      )}
    </div>
  );
}

export { CustomSelect };
