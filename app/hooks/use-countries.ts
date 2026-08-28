"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getCountries } from "@/lib/api/countries";

export function useCountries(search: string) {
  return useInfiniteQuery({
    queryKey: ["countries", search],

    queryFn: ({ pageParam }) => getCountries(pageParam, search),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}
