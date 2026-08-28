"use client";

import { Check, ChevronLeft } from "lucide-react";

import { Icon } from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";

export interface ReviewFormData {
  fullName: string;
  email: string;
  gender: string;
  country?: string;
  age: number;
  category: string;
  interests: string[];
}

interface ReviewStepProps {
  data: ReviewFormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

function formatValue(value?: string) {
  if (!value) return "—";

  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ReviewStep({
  data,
  onBack,
  onSubmit,
  isSubmitting = false,
}: ReviewStepProps) {
  const summaryItems = [
    {
      label: "Name",
      value: data.fullName,
    },
    {
      label: "Email",
      value: data.email,
    },
    {
      label: "Gender",
      value: formatValue(data.gender),
    },
    {
      label: "Country",
      value: formatValue(data.country),
    },
    {
      label: "Age",
      value: String(data.age),
    },
    {
      label: "Category",
      value: formatValue(data.category),
    },
  ];

  return (
    <div className="rounded-2xl bg-card p-8 shadow-md">
      {/* Header */}
      <h2 className="mb-8 text-3xl font-bold text-foreground">
        Review & Submit
      </h2>

      {/* User Summary */}
      <div className="rounded-2xl bg-muted/30 p-7">
        <h3 className="mb-5 text-2xl font-semibold text-foreground">
          User Summary
        </h3>

        <div>
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="flex min-h-16 items-center justify-between border-b border-border last:border-b-0"
            >
              <span className="text-lg text-muted-foreground">
                {item.label}:
              </span>

              <span className="text-right text-lg font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}

          {/* Interests */}
          <div className="flex min-h-16 items-center justify-between">
            <span className="text-lg text-muted-foreground">Interests:</span>

            <div className="flex flex-wrap justify-end gap-2">
              {data.interests.length > 0 ? (
                data.interests.map((interest, index) => (
                  <span
                    key={`${interest}-${index}`}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {formatValue(interest)}
                  </span>
                ))
              ) : (
                <span className="text-lg font-semibold text-foreground">—</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ready to submit */}
      <div className="mt-7 flex gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon icon={Check} size="md" className="text-primary" />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-primary">
            Ready to submit
          </h4>

          <p className="mt-1 text-base text-primary">
            Review all information carefully before submitting. You can go back
            to make changes.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex items-center justify-between border-t border-border pt-7">
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          disabled={isSubmitting}
          className="gap-2"
        >
          <Icon icon={ChevronLeft} size="md" />
          Back
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="gap-2"
        >
          <Icon icon={Check} size="md" />

          {isSubmitting ? "Submitting..." : "Submit User"}
        </Button>
      </div>
    </div>
  );
}

export { ReviewStep };
