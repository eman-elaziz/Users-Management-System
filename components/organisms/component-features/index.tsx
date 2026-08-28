"use client";

import type { LucideIcon } from "lucide-react";
import { UsersRound, Globe, Funnel } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClassName?: string;
  iconContainerClassName?: string;
}

const features: Feature[] = [
  {
    icon: UsersRound,
    title: "Multiple Select Types",
    description:
      "Single select, multi-select, and async select with pagination",
    iconClassName: "text-primary-600",
    iconContainerClassName: "bg-primary-50",
  },
  {
    icon: Globe,
    title: "Data Sources",
    description: "Static arrays, frontend search, and backend API calls",
    iconClassName: "text-primary-600",
    iconContainerClassName: "bg-primary-100",
  },
  {
    icon: Funnel,
    title: "Advanced Features",
    description: "Debounced search, infinite scroll, max selection limits",
    iconClassName: "text-blue-600",
    iconContainerClassName: "bg-blue-100",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
  iconClassName,
  iconContainerClassName,
}: Feature) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-background", "p-6")}
    >
      {/* Icon */}
      <div
        className={cn(
          "mb-5 flex size-14 items-center justify-center",
          "rounded-xl",
          iconContainerClassName,
        )}
      >
        <Icon
          className={cn("size-7", iconClassName)}
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>

        <p className="max-w-md text-base leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function ComponentFeatures() {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border",
        "bg-background p-8 container",
      )}
    >
      <h2 className="mb-8 text-3xl font-bold text-primary-700">
        Component Features
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

export { ComponentFeatures };
