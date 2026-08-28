"use client";

import { useRef, useState } from "react";

import { CustomSelect, type SelectOption } from "./custom-select";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface AsyncSelectResponse {
  data: SelectOption[];
  pagination: Pagination;
}

interface AsyncSelectProps {
  endpoint: string;

  label?: string;
  hint?: string;
  placeholder?: string;

  value?: string;
  onValueChange?: (value: string) => void;

  searchable?: boolean;

  limit?: number;

  className?: string;
}

function AsyncSelect({
  endpoint,
  label,
  hint,
  placeholder = "Select...",
  value,
  onValueChange,
  searchable = true,
  limit = 10,
  className,
}: AsyncSelectProps) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchOptions = async (
    pageNumber: number,
    searchValue = "",
    replace = false,
  ) => {
    if (loading) {
      return;
    }

    if (!replace && !hasMore) {
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(pageNumber),
        limit: String(limit),
      });

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      }

      const response = await fetch(`${endpoint}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch options: ${response.status}`);
      }

      const result = (await response.json()) as AsyncSelectResponse;

      setOptions((previous) => {
        const nextOptions = replace
          ? result.data
          : [...previous, ...result.data];

        return Array.from(
          new Map(nextOptions.map((option) => [option.value, option])).values(),
        );
      });

      setPage(result.pagination.page);
      setHasMore(result.pagination.hasMore);
    } catch (error) {
      console.error("AsyncSelect error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open || options.length > 0) {
      return;
    }

    fetchOptions(1);
  };

  const handleLoadMore = () => {
    if (loading || !hasMore) {
      return;
    }

    fetchOptions(page + 1);
  };

  const handleSearchChange = (searchValue: string) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      setPage(0);
      setHasMore(true);

      fetchOptions(1, searchValue, true);
    }, 300);
  };

  return (
    <CustomSelect
      label={label}
      hint={hint}
      options={options}
      value={value}
      onValueChange={(nextValue) => {
        if (typeof nextValue === "string") {
          onValueChange?.(nextValue);
        }
      }}
      placeholder={placeholder}
      searchable={searchable}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      onSearchChange={handleSearchChange}
      onOpenChange={handleOpenChange}
      className={className}
    />
  );
}

export { AsyncSelect };
