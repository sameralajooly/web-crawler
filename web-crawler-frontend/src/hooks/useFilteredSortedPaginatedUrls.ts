import { useMemo } from "react";
import type { URLRecord } from "../types/URLtable";

export const useFilteredSortedPaginatedUrls = (
  urls: URLRecord[],
  filters: Record<string, string>,
  globalSearch: string,
  sortKey: keyof URLRecord | null,
  sortDirection: "asc" | "desc",
  currentPage: number,
  pageSize: number
) => {
  const filteredUrls = useMemo(() => {
    return urls.filter((url: URLRecord) => {
      const lowerSearch = globalSearch.toLowerCase();

      const matchesGlobal =
        !globalSearch ||
        url.title.toLowerCase().includes(lowerSearch) ||
        url.htmlVersion.toLowerCase().includes(lowerSearch) ||
        url.status.toLowerCase().includes(lowerSearch) ||
        String(url.internalLinks).includes(lowerSearch) ||
        String(url.externalLinks).includes(lowerSearch) ||
        String(url.brokenLinks?.length ?? 0).includes(lowerSearch);

      if (!matchesGlobal) return false;

      if (
        filters.title &&
        !url.title.toLowerCase().includes(filters.title.toLowerCase())
      )
        return false;
      if (
        filters.htmlVersion &&
        !url.htmlVersion
          .toLowerCase()
          .includes(filters.htmlVersion.toLowerCase())
      )
        return false;

      if (
        filters.status &&
        !url.status.toLowerCase().includes(filters.status.toLowerCase())
      )
        return false;

      const numericFilters: (keyof typeof filters)[] = [
        "internalLinks",
        "externalLinks",
        "brokenLinks",
      ];

      for (const key of numericFilters) {
        if (filters[key]) {
          const num = Number(filters[key]);
          if (isNaN(num)) return false;

          if (key === "brokenLinks" && (url.brokenLinks?.length ?? 0) !== num)
            return false;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (key !== "brokenLinks" && (url as any)[key] !== num) return false;
        }
      }

      return true;
    });
  }, [urls, filters, globalSearch]);

  const sortedUrls = useMemo(() => {
    if (!sortKey) return filteredUrls;
    return [...filteredUrls].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        return sortDirection === "asc"
          ? aVal.length - bVal.length
          : bVal.length - aVal.length;
      }
      return 0;
    });
  }, [filteredUrls, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedUrls.length / pageSize);
  const paginatedUrls = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedUrls.slice(start, start + pageSize);
  }, [sortedUrls, currentPage, pageSize]);

  return { filteredUrls, sortedUrls, paginatedUrls, totalPages };
};
