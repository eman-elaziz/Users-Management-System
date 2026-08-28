import { Loader2 } from "lucide-react";

import { Icon } from "@/components/atoms/icon";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Icon
          icon={Loader2}
          size="lg"
          className="animate-spin text-primary-600"
        />

        <p className="text-sm font-medium text-muted-foreground">Loading...</p>
      </div>
    </main>
  );
}
