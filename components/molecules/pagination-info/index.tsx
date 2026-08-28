import { cn } from "@/lib/utils";

interface PaginationInfoProps {
  from: number;
  to: number;
  total: number;
  className?: string;
}

function PaginationInfo({ from, to, total, className }: PaginationInfoProps) {
  return (
    <p className={cn("text-base font-medium text-neutral-600", className)}>
      Showing {from} to {to} of {total} results
    </p>
  );
}

export { PaginationInfo };
