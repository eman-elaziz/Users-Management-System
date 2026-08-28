"use client";

import { Controller, useFormContext } from "react-hook-form";
import { CustomSelect } from "@/components/organisms/select/custom-select";
import { UserFormValues } from "../../types/user-form.types";

const categoryOptions = [
  { label: "Technology", value: "technology" },
  { label: "Design", value: "design" },
  { label: "Business", value: "business" },
  { label: "Marketing", value: "marketing" },
  { label: "Other", value: "other" },
];

const interestOptions = [
  { label: "Technology", value: "technology" },
  { label: "Design", value: "design" },
  { label: "Business", value: "business" },
  { label: "Marketing", value: "marketing" },
  { label: "Sports", value: "sports" },
  { label: "Travel", value: "travel" },
  { label: "Music", value: "music" },
  { label: "Photography", value: "photography" },
  { label: "Reading", value: "reading" },
  { label: "Gaming", value: "gaming" },
];

interface PreferencesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function PreferencesStep({ onNext, onBack }: PreferencesStepProps) {
  const { control, trigger } = useFormContext<UserFormValues>();

  const handleNext = async () => {
    const isValid = await trigger(["category", "interests"]);

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Preferences</h2>

      {/* Category */}
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <CustomSelect
              label="Category"
              options={categoryOptions}
              value={field.value}
              onValueChange={(value) => {
                if (typeof value === "string") {
                  field.onChange(value);
                }
              }}
              placeholder="Select a category"
            />

            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Interests */}
      <Controller
        name="interests"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <CustomSelect
              label="Interests"
              hint="Select up to 5 interests"
              options={interestOptions}
              multiple
              maxSelections={5}
              value={field.value}
              onValueChange={(value) => {
                if (Array.isArray(value)) {
                  field.onChange(value);
                }
              }}
              placeholder="Select interests"
            />

            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Actions */}
      <div className="flex justify-between border-t border-border pt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-border px-6 py-3 font-medium"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="rounded-xl bg-primary-600 px-6 py-3 font-medium text-white"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
