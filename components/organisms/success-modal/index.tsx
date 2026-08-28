"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Icon } from "@/components/atoms/icon";

interface SuccessModalProps {
  open?: boolean;
  onClose?: () => void;
}

export function SuccessModal({ open = true, onClose }: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="w-full max-w-175 rounded-2xl border border-border bg-background p-16">
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="mb-8 flex size-22 items-center justify-center rounded-full bg-primary-50">
          <Icon
            icon={CheckCircle2}
            size="lg"
            className="size-12 text-primary"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-foreground">
          User Added Successfully!
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-130 text-lg leading-7 text-muted-foreground">
          The user has been added to the system. You can now view their profile
          or continue adding more users.
        </p>

        {/* Actions */}
        <div className="mt-10 flex items-center gap-5">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Close
          </Button>

          <Button variant="primary" size="lg" onClick={onClose}>
            ADD another user
          </Button>
        </div>
      </div>
    </div>
  );
}
