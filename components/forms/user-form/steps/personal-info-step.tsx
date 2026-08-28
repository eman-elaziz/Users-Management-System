"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/atoms/button";
import { Icon } from "@/components/atoms/icon";
import { InputField } from "@/components/molecules/input-field";
import { CustomSelect } from "@/components/organisms/select/custom-select";
import { AsyncSelect } from "@/components/organisms/select/async-select";
import { ArrowRight } from "lucide-react";
import { UserFormValues } from "../../types/user-form.types";

interface PersonalInfoStepProps {
  onNext: () => void;
}

const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const { control, trigger } = useFormContext<UserFormValues>();

  const handleNext = async () => {
    const isValid = await trigger(["fullName", "email", "gender", "age"]);

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Personal Information
        </h2>
      </div>

      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <InputField
            {...field}
            label="Full Name"
            required
            placeholder="Eman Abdelaziz"
            hint={!fieldState.error ? "Must be 2-50 characters" : undefined}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <InputField
            {...field}
            label="Email Address"
            required
            type="email"
            placeholder="eman@example.com"
            error={fieldState.error?.message}
          />
        )}
      />

      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <CustomSelect
              label="Gender"
              hint="Required"
              options={genderOptions}
              placeholder="Select gender"
              value={field.value}
              onValueChange={(value) => {
                if (typeof value === "string") {
                  field.onChange(value);
                }
              }}
            />

            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Country */}
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <AsyncSelect
              endpoint="/api/countries"
              label="Country"
              hint="Optional"
              placeholder="Select country"
              value={field.value}
              onValueChange={field.onChange}
            />

            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Age */}
      <Controller
        name="age"
        control={control}
        render={({ field, fieldState }) => (
          <InputField
            label="Age"
            required
            type="number"
            placeholder="30"
            value={field.value === undefined ? "" : String(field.value)}
            onBlur={field.onBlur}
            hint={!fieldState.error ? "Must be between 18-100" : undefined}
            error={fieldState.error?.message}
            onChange={(event) => {
              const value = event.target.value;

              field.onChange(value === "" ? undefined : Number(value));
            }}
            maxLength={3}
            max={100}
          />
        )}
      />

      {/* Actions */}
      <div className="flex justify-end border-t border-border pt-6">
        <Button
          type="button"
          variant="primary"
          size="default"
          onClick={handleNext}
        >
          Next Step
          <Icon icon={ArrowRight} size="sm" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

export { PersonalInfoStep };
