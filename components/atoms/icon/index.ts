import { createElement } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const iconSizes = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

function Icon({ icon, size = "md", className }: IconProps) {
  return createElement(icon, {
    "aria-hidden": true,
    className: cn(iconSizes[size], className),
  });
}

export { Icon };
