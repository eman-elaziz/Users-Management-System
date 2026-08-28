"use client";

import { PaginationControls } from "@/components/molecules/pagination-controls";
import { PaginationInfo } from "@/components/molecules/pagination-info";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  className,
}: PaginationProps) {
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-2xl border border-neutral-200 p-6",
        className,
      )}
    >
      <PaginationInfo from={from} to={to} total={totalItems} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export { Pagination };
