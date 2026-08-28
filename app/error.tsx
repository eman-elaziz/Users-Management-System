"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Icon } from "@/components/atoms/icon";
import { Button } from "@/components/atoms/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.error(error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-card p-8 text-center shadow-md">
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-destructive/10">
          <Icon icon={AlertCircle} size="lg" className="text-destructive" />
        </div>

        <h1 className="text-2xl font-bold text-foreground">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We could not load this page. Please try again.
        </p>

        <Button
          type="button"
          variant="primary"
          onClick={reset}
          className="mt-6 gap-2"
        >
          <Icon icon={RefreshCw} size="md" />
          Try again
        </Button>
      </div>
    </main>
  );
}
