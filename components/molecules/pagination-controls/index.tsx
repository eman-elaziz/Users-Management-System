"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

type PageItem = number | "ellipsis";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationControlsProps) {
  const getPages = (): PageItem[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", currentPage, "ellipsis", totalPages];
  };

  const pages = getPages();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Previous */}
      <Button
        variant="ghost"
        size="lg"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="border border-neutral-200 bg-transparent px-5"
      >
        <ChevronLeft className="size-5" />
        Previous
      </Button>

      {/* Pages */}
      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex size-12 items-center justify-center"
              aria-hidden="true"
            >
              <MoreHorizontal className="size-5 text-neutral-600" />
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "ghost"}
            size="lg"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange?.(page)}
            className={cn(
              "min-w-12",
              page !== currentPage &&
                "border border-neutral-200 bg-transparent",
            )}
          >
            {page}
          </Button>
        );
      })}

      {/* Next */}
      <Button
        variant="ghost"
        size="lg"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="border border-neutral-200 bg-transparent px-5"
      >
        Next
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}

export { PaginationControls };
